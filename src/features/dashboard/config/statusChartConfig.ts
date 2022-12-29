import { Statuses } from 'features/assets';

export const statusChartConfig = {
  color: ({ label }: any) => {
    switch (label) {
      case Statuses.Archived:
        return '#F44336';
      case Statuses.ReadyToDeploy:
        return '#66BB6A';
      case Statuses.Deployed:
        return '#29B6F6';
      case Statuses.Maintenance:
        return '#FFA726';
      default:
        return '#5B8FF9';
    }
  },
};
