import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface Props {
  agentName: string
  inviteLink: string
  invitedBy?: string
  temporaryPassword: string
}

export function AgentInvite({ agentName, inviteLink, invitedBy, temporaryPassword }: Props) {
  return (
    <Html>
      <Head />
      <Preview>You're invited to join Shanta Sriram CRM</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={brandBar}>
            <Text style={brandKicker}>SHANTA SRIRAM</Text>
            <Text style={brandTitle}>Team Invitation</Text>
          </Section>
          <Section style={card}>
            <Heading as="h1" style={h1}>You're invited to the team</Heading>
            <Text style={subtitle}>
              Join the Shanta Sriram CRM to manage leads, bookings, and sales pipeline.
            </Text>
            <Hr style={hr} />
            <Text style={bodyText}>
              Hi <strong>{agentName}</strong>,
            </Text>
            <Text style={bodyText}>
              {invitedBy ? `${invitedBy} has invited you to join the Shanta Sriram Sales CRM.` : 'You have been invited to join the Shanta Sriram Sales CRM.'}
            </Text>
            <Text style={bodyText}>
              Click the button below to set up your account and start managing leads:
            </Text>
            <Section style={btnWrap}>
              <Button href={inviteLink} style={button}>
                Log In to CRM
              </Button>
            </Section>
            <Hr style={hr} />
            <Heading as="h3" style={credentialsHeading}>Your Login Credentials</Heading>
            <Text style={bodyText}>
              Use these credentials to log in:
            </Text>
            <Section style={credentialsBox}>
              <Text style={credentialLabel}>Email:</Text>
              <Text style={credentialValue}>{agentName}</Text>
              <Text style={credentialLabel} style={{ marginTop: 12 }}>Temporary Password:</Text>
              <Text style={credentialValue}>{temporaryPassword}</Text>
            </Section>
            <Text style={bodyText}>
              <strong>Important:</strong> Please change your password after your first login for security.
            </Text>
            <Hr style={hr} />
            <Text style={smallText}>
              This link expires in 24 hours. If you didn't expect this invitation, you can safely ignore this email.
            </Text>
          </Section>
          <Text style={footer}>
            Shanta Sriram Constructions Pvt. Ltd. - CRM Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const body = {
  backgroundColor: '#F8F4EF',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
  margin: 0,
  padding: '24px 0',
}
const container = { maxWidth: 560, margin: '0 auto' }
const brandBar = {
  backgroundColor: '#1A1A2E',
  padding: '20px 24px',
  borderRadius: '6px 6px 0 0',
}
const brandKicker = {
  color: '#CD0E12',
  fontSize: 11,
  letterSpacing: '0.24em',
  margin: 0,
}
const brandTitle = { color: '#FFFFFF', fontSize: 18, margin: '4px 0 0 0' }
const card = {
  backgroundColor: '#FFFFFF',
  padding: '28px',
  borderRadius: '0 0 6px 6px',
  border: '1px solid #E8ECF0',
}
const h1 = { color: '#1A1A2E', fontSize: 22, margin: '0 0 8px 0' }
const subtitle = { color: '#6B6B6B', fontSize: 14, margin: '0 0 16px 0' }
const bodyText = { color: '#1A1A2E', fontSize: 14, lineHeight: '1.6', margin: '12px 0' }
const smallText = { color: '#6B6B6B', fontSize: 12, lineHeight: '1.5', margin: '12px 0' }
const hr = { borderColor: '#E8ECF0', margin: '20px 0' }
const btnWrap = { textAlign: 'center' as const, marginTop: 24 }
const button = {
  backgroundColor: '#CD0E12',
  color: '#FFFFFF',
  padding: '14px 28px',
  borderRadius: 4,
  fontSize: 14,
  fontWeight: 500,
  textDecoration: 'none',
  display: 'inline-block',
}
const codeStyle = {
  backgroundColor: '#F8F4EF',
  padding: '8px 12px',
  borderRadius: 4,
  fontSize: 12,
  fontFamily: 'monospace',
  wordBreak: 'break-all' as const,
  color: '#1A1A2E',
}
const credentialsHeading = { color: '#1A1A2E', fontSize: 16, margin: '16px 0 12px 0', fontWeight: 600 }
const credentialsBox = {
  backgroundColor: '#F8F4EF',
  padding: '16px',
  borderRadius: 4,
  marginTop: 12,
  marginBottom: 16,
  border: '1px solid #E8ECF0',
}
const credentialLabel = { color: '#6B6B6B', fontSize: 12, margin: '0', fontWeight: 500 }
const credentialValue = {
  color: '#1A1A2E',
  fontSize: 14,
  fontFamily: 'monospace',
  fontWeight: 600,
  backgroundColor: '#FFFFFF',
  padding: '8px 12px',
  borderRadius: 4,
  margin: '4px 0 0 0',
  wordBreak: 'break-all' as const,
}
const footer = {
  color: '#6B6B6B',
  fontSize: 11,
  textAlign: 'center' as const,
  marginTop: 16,
}
