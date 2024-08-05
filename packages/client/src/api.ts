import {getCodeSandboxHost} from "@codesandbox/utils";

const codeSandboxHost = getCodeSandboxHost(3001)
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

export async function get<T>(uri: string): Promise<T> {
  try {
    const data = await fetch(`${API_URL}/${uri}`);
    return data.json();
  } catch (err) {
    console.log(`Failed to get ${API_URL}/${uri}`, err);
    throw err;
  }
}