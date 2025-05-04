/* eslint-disable react/no-unescaped-entities */
import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Section,
	Text,
	Heading,
	Tailwind,
	render,
} from "@react-email/components";

export default function TwoFactorAuthEmail({ code }: { code: string }) {
	return (
		<Tailwind>
			<Html>
				<Head />
				<Preview>Your 2FA Code</Preview>
				<Body className="bg-black text-white font-sans p-5">
					<Container className="max-w-xl mx-auto bg-white/10 p-10 rounded-lg">
						<Section className="text-center">
							<Heading
								as="h1"
								className="text-white mb-5 text-2xl font-bold">
								Your 2FA Code
							</Heading>
							<Text className="text-white/80 text-base mb-5">
								Use the following code to complete your sign-in. This code is
								valid for a limited time.
							</Text>
							<Text className="bg-white text-black text-2xl font-bold py-2 px-4 rounded-md inline-block">
								{code}
							</Text>
							<Text className="text-white/60 text-sm mt-5">
								If you didn't request this code, you can safely ignore this
								email.
							</Text>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
}

export const twoFAHTML = async ({ code }: { code: string }) => {
	const htmlOutput = await render(<TwoFactorAuthEmail code={code} />);
	return htmlOutput;
};
