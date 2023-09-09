import { AppListItem } from 'boot/api';

interface AppListLayoutItem extends AppListItem {
  position?: {
    left: number;
    top: number;
  };
  style?: string;
  class?: {
    active: boolean;
    animation: boolean;
    appCard: boolean;
    cover: boolean;
  };
  imgError?: boolean;
  imgSrc?: string;
}

export { CoverState, AppListLayoutItem, ContainerState };
