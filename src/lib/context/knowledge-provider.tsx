"use client";
import { Knowledge } from "@/types/agents/writer";
import React, { createContext, useContext, useReducer } from "react";

interface KnowledgeState {
	knowledges: Knowledge[];
	files: File[];
	isPending: boolean;
	websiteUrl: string;
}

type KnowledgeAction =
	| { type: "SET_KNOWLEDGES"; payload: Knowledge[] }
	| { type: "SET_FILES"; payload: File[] }
	| { type: "SET_IS_PENDING"; payload: boolean }
	| { type: "SET_WEBSITE_URL"; payload: string }
	| { type: "ADD_KNOWLEDGE"; payload: Knowledge }
	| { type: "ADD_FILES"; payload: File[] }
	| { type: "REMOVE_KNOWLEDGE"; payload: string }
	| { type: "RESET" }; // Add RESET action

const KnowledgeContext = createContext<
	| {
			state: KnowledgeState;
			dispatch: React.Dispatch<KnowledgeAction>;
	  }
	| undefined
>(undefined);

const knowledgeReducer = (
	state: KnowledgeState,
	action: KnowledgeAction
): KnowledgeState => {
	switch (action.type) {
		case "SET_KNOWLEDGES":
			return { ...state, knowledges: action.payload };
		case "SET_FILES":
			return { ...state, files: action.payload };
		case "SET_IS_PENDING":
			return { ...state, isPending: action.payload };
		case "SET_WEBSITE_URL":
			return { ...state, websiteUrl: action.payload };
		case "ADD_KNOWLEDGE":
			return { ...state, knowledges: [...state.knowledges, action.payload] };
		case "ADD_FILES":
			return { ...state, files: [...state.files, ...action.payload] };
		case "REMOVE_KNOWLEDGE":
			return {
				...state,
				knowledges: state.knowledges.filter(
					(item) => item.id !== action.payload
				),
			};
		case "RESET":
			return {
				knowledges: [],
				files: [],
				isPending: false,
				websiteUrl: "",
			};
		default:
			return state;
	}
};

export const KnowledgeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(knowledgeReducer, {
		knowledges: [],
		files: [],
		isPending: false,
		websiteUrl: "",
	});

	return (
		<KnowledgeContext.Provider value={{ state, dispatch }}>
			{children}
		</KnowledgeContext.Provider>
	);
};

export const useKnowledge = () => {
	const context = useContext(KnowledgeContext);
	if (!context) {
		throw new Error("useKnowledge must be used within a KnowledgeProvider");
	}
	return context;
};
