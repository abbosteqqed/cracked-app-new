// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export default function CodeInline({ node, ...rest }: any) {
	return (
		<code
			{...rest}
			className="text-xs font-mono font-medium text-gray-200 bg-slate-3 px-2.5 py-0.5 
            border border-slate-6 rounded-md shadow-sm backdrop-blur-md transition 
             hover:border-slate-7"
		/>
	);
}
