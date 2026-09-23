# OAuth uses n8n's dynamic client registration, not a pre-registered client

Most users run self-hosted n8n, each with its own callback URL, and n8n cloud offers no way to hold a
community node's OAuth secret. So the OAuth2 credential sets n8n's hidden
`useDynamicClientRegistration` flag and points `serverUrl` at the tenant's API URL: on every connect
n8n discovers the server, registers itself as a public PKCE client, and sends the tenant URL as the
RFC 8707 `resource`. There is no client ID or secret to paste, and no first-party n8n client.

**Consequences:** each n8n host becomes its own client, which waits for Qonekto support approval
before non-superadmins can connect (mvp-connector ADR 0058). Every instance registers under the name
"n8n", so only the redirect host tells them apart. Token refresh for such credentials works from n8n
2.35.0 on.

**Considered options:** a manual client ID pasted by the user (an extra support step per instance,
for no gain over self-registration); one first-party client pinned to `oauth.n8n.cloud` (its secret
would ship to every user, and the node is not verified for n8n cloud anyway).
