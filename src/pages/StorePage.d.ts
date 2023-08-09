import { AppListItem } from 'boot/api';
import { ComputedRef, Ref } from 'vue/dist/vue';

interface CoverState {
  active: boolean;
  animation: boolean;
  cover: boolean;
  application: boolean;
  open?: boolean;
  loaded?: boolean;
}

interface AppListLayoutItem extends AppListItem {
  position?: {
    left: ComputedRef<number>;
    top: ComputedRef<number>;
  };
  style?: ComputedRef<string>;
  class?: {
    active: boolean;
    animation: boolean;
    appCard: boolean;
    cover: boolean;
  };
  imgError?: Ref<boolean>;
  imgSrc?: ComputedRef<string>;
}

interface ContainerState {
  active: boolean;
  animation: boolean;
  cover: boolean;
}

export { CoverState, AppListLayoutItem, ContainerState };
