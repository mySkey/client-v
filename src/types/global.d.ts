declare global {
  interface Window {
    _env: any;
    client_v_clientVersion: string;
    client_v_remoteVersion: string;
  }
}

declare interface Window {
  client_v_clientVersion: string;
  client_v_remoteVersion: string;
  ketcher?: any;
}

declare const client_v_clientVersion: string;
declare const client_v_remoteVersion: string;
