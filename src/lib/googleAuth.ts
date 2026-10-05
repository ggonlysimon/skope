import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const GMAIL_SCOPES = [
  'https://www.googleapis.com/auth/gmail.send'
];

const provider = new GoogleAuthProvider();
GMAIL_SCOPES.forEach(scope => provider.addScope(scope));

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token was cleared or expired in memory
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve Google access token for Gmail API');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Sends an email via the Gmail REST API (users.messages.send)
 * Uses RFC 2822 standard email formatted string converted to URL-safe base64
 */
export async function sendGmailVerification({
  to,
  subject,
  verificationCode,
  recipientName,
  customNotes,
  packageName
}: {
  to: string;
  subject: string;
  verificationCode: string;
  recipientName?: string;
  customNotes?: string;
  packageName?: string;
}): Promise<{ id: string; threadId: string }> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to grant Gmail sending permission.');
  }

  const currentUser = auth.currentUser;
  const fromName = currentUser?.displayName || 'Skope Engineering';
  const fromEmail = currentUser?.email || 'me';

  const bodyContent = `
Hello ${recipientName || 'Valued Client'},

This is an official verification message from Skope (build. automate. grow.).

==================================================
VERIFICATION CODE: ${verificationCode}
==================================================

Target Scope / Package: ${packageName || 'Skope Custom Solution'}
Status: Verified & Approved
Timestamp: ${new Date().toUTCString()}

${customNotes ? `Admin Notes:\n${customNotes}\n\n` : ''}
If you did not request this verification or order inquiry, please disregard this email.

Best regards,
${fromName}
Skope Automation & Engineering Team
  `.trim();

  // Create RFC 2822 email format
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const messageParts = [
    `From: "${fromName}" <${fromEmail}>`,
    `To: <${to}>`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    bodyContent
  ];
  const message = messageParts.join('\r\n');

  // Convert to url-safe base64 string without trailing padding '=' issues
  const encodedMessage = btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: encodedMessage
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error?.message || `Gmail send failed with status: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
