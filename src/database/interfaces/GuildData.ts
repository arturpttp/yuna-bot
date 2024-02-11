export interface GuildData {
  channels?: {
    logs?: {
      id: string;
    };
  };
  logs?: {
    channel?: {
      id?: string;
    };
    enabled: boolean;
  };
  welcome?: {
    channel?: {
      id?: string;
    };
    enabled: boolean;
  };
  createdAt: Date;
}
