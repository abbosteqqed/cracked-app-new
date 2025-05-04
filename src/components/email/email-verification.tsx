import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Section,
	Text,
	Heading,
	Button,
	render,
	Tailwind,
} from "@react-email/components";

export default function ConfirmationEmail({ link }: { link: string }) {
	return (
		<Tailwind>
			<Html>
				<Head />
				<Preview>Confirm your email to get started</Preview>
				<Body className="bg-black text-white font-sans p-5">
					<Container className="max-w-xl mx-auto bg-white/10 p-10 rounded-lg">
						<Section className="text-center">
							<Heading
								as="h1"
								className="text-white mb-5 text-2xl font-bold">
								Confirm Your Email
							</Heading>
							<Text className="text-white/80 text-base mb-5">
								Thank you for signing up! Please confirm your email address by
								clicking the button below.
							</Text>
							<Button
								className="bg-white text-black px-6 py-3 rounded-md text-lg font-semibold"
								href={link}>
								Confirm Email
							</Button>
							<Text className="text-white/60 text-sm mt-5">
								If you didn’t sign up, you can safely ignore this email.
							</Text>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
}

export const emailConfirmEmailHTML = async ({ link }: { link: string }) => {
	const htmlOutput = await render(<ConfirmationEmail link={link} />);
	return htmlOutput;
};
