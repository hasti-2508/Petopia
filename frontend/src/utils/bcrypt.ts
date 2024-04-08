import crypto from 'crypto';

const ENCRYPTION_KEY = `${process.env.SECRET}`; // Should be securely stored, consider using environment variables
const IV_LENGTH = 16; // For AES, this is always 16

// Function to encrypt token
const encryptToken = (token) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(token);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// Function to decrypt token
const decryptToken = (encryptedToken) => {
  let textParts = encryptedToken.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export { encryptToken, decryptToken };
