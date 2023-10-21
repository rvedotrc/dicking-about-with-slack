import * as crypto from 'crypto';

const verifier = (secret: string) => {
  const verify = async (
    xHubSignature256: string,
    payload: string,
  ): Promise<boolean> => {
    const signature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    const trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    const untrusted = Buffer.from(xHubSignature256, 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
  };

  const close = async (): Promise<undefined> => undefined;

  return { verify, close };
};

export default { verifier };
