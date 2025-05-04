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
	Button,
	render,
	Tailwind,
} from "@react-email/components";

export default function ResetPasswordEmail({ link }: { link: string }) {
	return (
		<Tailwind>
			<Html>
				<Head />
				<Preview>Reset your password</Preview>
				<Body className="bg-black text-white font-sans p-5">
					<Container className="max-w-xl mx-auto bg-white/10 p-10 rounded-lg">
						<Section className="text-center">
							<Heading
								as="h1"
								className="text-white mb-5 text-2xl font-bold">
								Reset Your Password
							</Heading>
							<Text className="text-white/80 text-base mb-5">
								You recently requested to reset your password. Please click the
								button below to create a new password.
							</Text>
							<Button
								className="bg-white text-black px-6 py-3 rounded-md text-lg font-semibold"
								href={link}>
								Reset Password
							</Button>
							<Text className="text-white/60 text-sm mt-5">
								If you didn't request a password reset, you can safely ignore
								this email. Your password will remain unchanged.
							</Text>
							{/* Optional: Add an expiration message */}
							<Text className="text-white/60 text-sm mt-5">
								This link is valid for a short time.
							</Text>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	);
}

export const resetPasswordEmailHTML = async ({ link }: { link: string }) => {
	const htmlOutput = await render(<ResetPasswordEmail link={link} />);
	return htmlOutput;
};
