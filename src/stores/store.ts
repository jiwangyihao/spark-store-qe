import { defineStore } from 'pinia';
import { AppListLayoutItem } from 'pages/StorePage';
import defaultIcon from 'assets/img/store/application.svg';

export const useStore = defineStore('counter', {
  state: () => ({
    sortCache: {
      //卡片排布
      config: {
        cardWidth: 264, //卡片宽度
        cardHeight: 92, //卡片高度
        verticalPadding: 50, //垂直边距（下边距只有1/2）
        horizonPadding: 16, //水平边距
        gap: 32, //卡片间距
      },
      sort: <string | null>null,
      appList: <AppListLayoutItem[]>[],
      containerState: {
        active: false,
        animation: false,
        cover: false,
      },
      coverState: {
        active: false,
        animation: false,
        cover: false,
        application: false,
        open: false,
        loaded: false,
      },
      activeCard: <AppListLayoutItem | null>null,
      containerHeight: '',
      column: 0,
      horizonGap: 0,
      cover: {
        style: '',
      },
      scrollTop: 0,
      clientWidth: 0,
      clientHeight: 0,
    },
    source: 'https://d.store.deepinos.org.cn',
    debSource: 'https://mirrors.sdu.edu.cn/spark-store-repository/',
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setActiveCard(card: AppListLayoutItem | null) {
      this.sortCache.activeCard = card;

      this.refreshStyle();
    },
    setImgError(item: AppListLayoutItem, state: boolean) {
      item.imgError = state;
      const imgSrc = `${this.source}/store/${
        this.sortCache.sort
      }/${item.Package.replaceAll('+', '%2B')}/icon.png`;
      item.imgSrc = item.imgError ? defaultIcon : imgSrc;
    },
    onContainerWidthChange(width: number) {
      this.sortCache.clientWidth = width;

      this.sortCache.column = Math.floor(
        (width +
          this.sortCache.config.gap -
          this.sortCache.config.horizonPadding * 2) /
          (this.sortCache.config.cardWidth + this.sortCache.config.gap),
      );

      this.sortCache.containerHeight = `${
        Math.ceil(this.sortCache.appList.length / this.sortCache.column) *
          (this.sortCache.config.cardHeight + this.sortCache.config.gap) +
        this.sortCache.config.gap +
        this.sortCache.config.verticalPadding * 1.5
      }px`;

      this.sortCache.horizonGap =
        (width -
          (this.sortCache.config.cardWidth + this.sortCache.config.gap) *
            this.sortCache.column +
          this.sortCache.config.gap -
          this.sortCache.config.horizonPadding * 2) /
        (this.sortCache.column + 1);

      this.sortCache.appList.forEach((item, index) => {
        item.position = {
          left:
            (index % this.sortCache.column) *
              (this.sortCache.horizonGap +
                this.sortCache.config.gap +
                this.sortCache.config.cardWidth) +
            this.sortCache.config.horizonPadding +
            this.sortCache.horizonGap,
          top:
            Math.floor(index / this.sortCache.column) *
              (this.sortCache.config.cardHeight + this.sortCache.config.gap) +
            this.sortCache.config.verticalPadding,
        };
        item.style = `transform:translate(${item.position.left}px,${item.position.top}px)`;
      });

      this.refreshStyle();
    },
    onScroll(scrollTop: number) {
      this.sortCache.scrollTop = scrollTop;

      this.refreshStyle();
    },
    onContainerHeightChange(height: number) {
      this.sortCache.clientHeight = height;

      this.refreshStyle();
    },
    refreshStyle() {
      this.sortCache.cover.style = `--j-left:${
        <number>this.sortCache.activeCard?.position?.left -
        this.sortCache.clientWidth / 2 -
        30
      }px;--j-top:${
        <number>this.sortCache.activeCard?.position?.top -
        this.sortCache.clientHeight / 2 -
        this.sortCache.scrollTop -
        15
      }px;`;
    },
  },
});
