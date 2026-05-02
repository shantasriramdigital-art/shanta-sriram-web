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
  leadName: string
  leadPhone: string
  leadEmail: string | null
  leadSource: string | null
  projectInterest: string | null
  budget: string
  agentName: string | null
  leadDetailUrl: string
}

export function NewLeadAlert(props: Props) {
  return (
    <Html>
      <Head />
      <Preview>New lead from {props.leadName}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={brandBar}>
            <Text style={brandKicker}>SHANTA SRIRAM</Text>
            <Text style={brandTitle}>CRM Alert</Text>
          </Section>
          <Section style={card}>
            <Heading as="h1" style={h1}>New lead just landed</Heading>
            <Text style={subtitle}>
              {props.agentName
                ? `Assigned to ${props.agentName}. Reach out within 2 hours.`
                : 'Unassigned. Please claim and contact within 2 hours.'}
            </Text>
            <Hr style={hr} />
            <Row label="Name" value={props.leadName} />
            <Row label="Phone" value={props.leadPhone} />
            {props.leadEmail && <Row label="Email" value={props.leadEmail} />}
            {props.projectInterest && <Row label="Project" value={props.projectInterest} />}
            <Row label="Budget" value={props.budget} />
            {props.leadSource && <Row label="Source" value={props.leadSource} />}
            <Hr style={hr} />
            <Section style={btnWrap}>
              <Button href={props.leadDetailUrl} style={button}>
                View Lead in CRM
              </Button>
            </Section>
          </Section>
          <Text style={footer}>
            Shanta Sriram Constructions Pvt. Ltd. - CRM alert
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Section style={rowStyle}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </Section>
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
const subtitle = { color: '#6B6B6B', fontSize: 14, margin: 0 }
const hr = { borderColor: '#E8ECF0', margin: '20px 0' }
const rowStyle = { margin: '6px 0' }
const rowLabel = {
  color: '#6B6B6B',
  fontSize: 11,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  margin: 0,
}
const rowValue = { color: '#1A1A2E', fontSize: 15, margin: '2px 0 0 0' }
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
const footer = {
  color: '#6B6B6B',
  fontSize: 11,
  textAlign: 'center' as const,
  marginTop: 16,
}
