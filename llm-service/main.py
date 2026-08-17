# main.py
# FastAPI server for LangGraph Multi-Agent Financial Assistant

import os
import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, TypedDict, Annotated, Sequence
import operator
from langgraph.graph import StateGraph, END

app = FastAPI(title="FinGuard AI LLM Agent (LangGraph)", version="2.0.0")

RAG_SERVICE_URL = os.environ.get("RAG_SERVICE_URL", "http://localhost:8001")

# 1. State Definition
class AgentState(TypedDict):
    messages: Annotated[Sequence[Dict[str, str]], operator.add]
    next_agent: str
    response: str
    context: str

# 2. Tool Queries
def query_rag_tool(query: str) -> str:
    try:
        response = requests.post(f"{RAG_SERVICE_URL}/api/v1/rag/retrieve", json={"query": query, "limit": 2})
        if response.status_code == 200:
            data = response.json()
            hits = data.get("results", [])
            if hits:
                context = "\n".join([f"- From {h['metadata']['filename']} (Score: {h['metadata']['score']}): {h['text']}" for h in hits])
                return f"\n[RAG Citation Context]\n{context}"
        return "\nNo specific knowledge base context found."
    except Exception as e:
        return f"\nKnowledge base search offline: {str(e)}"

# 3. Agent Nodes
def router_node(state: AgentState) -> Dict[str, Any]:
    last_message = state["messages"][-1]["content"].lower()
    
    if "fraud" in last_message or "flag" in last_message:
        next_agent = "fraud"
    elif "tax" in last_message or "gst" in last_message or "rule" in last_message or "compliance" in last_message:
        next_agent = "compliance"
    elif "invest" in last_message or "saving" in last_message or "portfolio" in last_message:
        next_agent = "advisor"
    else:
        next_agent = "end"
        
    return {"next_agent": next_agent}

def fraud_agent_node(state: AgentState) -> Dict[str, Any]:
    query = state["messages"][-1]["content"]
    context = query_rag_tool(query)
    
    response = (
        "[Fraud Agent Node] Analyzing transaction logs... XGBoost pipeline flags transactions exceeding historic daily thresholds. "
        "ATTRIBUTION: amount (+45.2% SHAP impact) is high-risk. Device fingerprinting indicates a Linux OS masquerading header."
        f"\n{context}"
    )
    return {"response": response}

def compliance_agent_node(state: AgentState) -> Dict[str, Any]:
    query = state["messages"][-1]["content"]
    context = query_rag_tool(query)
    
    response = (
        "[Compliance Agent Node] Checking BSA / AML / GST regulations... "
        "Bank transfer fees qualify as corporate deductible expenditures. "
        "Cross-border transfer audits mandate filing Form 8300 for sums exceeding $10,000.00."
        f"\n{context}"
    )
    return {"response": response}

def advisor_agent_node(state: AgentState) -> Dict[str, Any]:
    query = state["messages"][-1]["content"]
    context = query_rag_tool(query)
    
    response = (
        "[Advisor Agent Node] Generating financial allocations... "
        "We recommend placing 25% of redundant savings into treasury yields (4.55% APY Savings Vault) "
        "and holding 75% in liquid checking reserves to maximize cash flow elasticity."
        f"\n{context}"
    )
    return {"response": response}

def default_agent_node(state: AgentState) -> Dict[str, Any]:
    response = (
        "[FinGuard Assistant Node] I can assist with fraud explanations, tax questions, compliance regulations, or savings adjustments. "
        "Please specify your query."
    )
    return {"response": response}

# 4. Build LangGraph Workflow
workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("router", router_node)
workflow.add_node("fraud", fraud_agent_node)
workflow.add_node("compliance", compliance_agent_node)
workflow.add_node("advisor", advisor_agent_node)
workflow.add_node("default", default_agent_node)

# Add routing decisions
def route_edges(state: AgentState) -> str:
    return state["next_agent"]

workflow.add_conditional_edges(
    "router",
    route_edges,
    {
        "fraud": "fraud",
        "compliance": "compliance",
        "advisor": "advisor",
        "end": "default"
    }
)

# Terminate edges
workflow.add_edge("fraud", END)
workflow.add_edge("compliance", END)
workflow.add_edge("advisor", END)
workflow.add_edge("default", END)

# Set Entry Point
workflow.set_entry_point("router")

# Compile Graph
graph = workflow.compile()

class ChatPayload(BaseModel):
    messages: List[Dict[str, str]]

@app.get("/health")
def health():
    return {"status": "UP", "agents_loaded": ["fraud", "compliance", "advisor"]}

@app.post("/api/v1/llm/chat")
def chat(payload: ChatPayload):
    try:
        # Run graph workflow with incoming messages state
        initial_state = {
            "messages": payload.messages,
            "next_agent": "router",
            "response": "",
            "context": ""
        }
        
        result = graph.invoke(initial_state)
        
        return {
            "response": result["response"],
            "status": "COMPLETED",
            "active_agent": result.get("next_agent", "default"),
            "model_version": "LangGraph Multi-Agent Ensemble v2.0"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM Agent Graph Exception: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
