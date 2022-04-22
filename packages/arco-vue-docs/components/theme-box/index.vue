<template>
  <Badge class="theme-badge" :count="theme ? 1 : 0" dot>
    <Button
      class="theme-badge-button"
      :shape="hover ? 'round' : 'circle'"
      size="large"
      @click="modalVisible = true"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <IconSkin />
      <span v-if="hover" style="margin-left: 8px">
        {{ t('themeBox.installTheme') }}
      </span>
    </Button>
  </Badge>
  <Modal
    :visible="modalVisible"
    :width="900"
    @ok="modalVisible = false"
    @cancel="modalVisible = false"
  >
    <template #title>
      <div class="theme-box-header">
        <span>{{ t('themeBox.installTheme') }}</span>
        <div>
          <Input
            :model-value="searchValue"
            :placeholder="t('themeBox.search')"
            allow-clear
            @input="onSearchInput"
          />
        </div>
      </div>
    </template>
    <Row :gutter="[20, 20]">
      <template v-if="isLoading">
        <Col v-for="(_, index) of loadingFillArray" :key="index" :span="8">
          <Card v-if="isLoading" class="theme-box-card">
            <template #cover>
              <Skeleton animation>
                <SkeletonShape style="width: 272px; height: 160px" />
              </Skeleton>
            </template>
            <CardMeta>
              <template #title>
                <Skeleton animation>
                  <SkeletonLine :line-height="25" />
                </Skeleton>
              </template>
            </CardMeta>
            <Skeleton animation>
              <SkeletonShape
                style="
                  width: 100px;
                  height: 24px;
                  margin-top: 20px;
                  margin-left: auto;
                "
              />
            </Skeleton>
          </Card>
        </Col>
      </template>
      <template v-else-if="themeList.length > 0">
        <Col v-for="item of themeList" :key="item.themeId" :span="8">
          <Card class="theme-box-card">
            <template #cover>
              <img :src="item.cover" style="height: 160px" alt="theme-cover" />
            </template>
            <template #actions>
              <Button
                class="theme-box-card-link"
                type="text"
                size="mini"
                :href="`https://arco.design/themes/design/${item.themeId}`"
              >
                <template #icon>
                  <IconLink />
                </template>
                {{ t('themeBox.openInDesignLab') }}
              </Button>
              <Tag
                v-if="theme && theme.themeId === item.themeId"
                color="arcoblue"
              >
                {{ t('themeBox.currentTheme') }}
              </Tag>
              <Button
                v-else
                type="primary"
                size="mini"
                @click="() => useTheme(item)"
              >
                {{ t('themeBox.install') }}
              </Button>
            </template>
            <CardMeta :title="item.packageName" />
          </Card>
        </Col>
      </template>
      <template v-else>
        <Empty style="margin: 200px 0">
          <template #description>
            {{ t('themeBox.noResult') }}
            <Link :href="`https://arco.design/themes`">
              {{ t('themeBox.createTheme') }}
            </Link>
          </template>
        </Empty>
      </template>
    </Row>
    <div class="theme-box-bottom">
      <Pagination
        :total="total"
        :current="page"
        :page-size="6"
        @change="onPageChange"
      />
    </div>
    <template v-if="theme" #footer>
      <div class="theme-box-footer">
        <TypographyText bold>
          {{ t('themeBox.currentTheme') }}: {{ theme.themeName }}
        </TypographyText>
        <Button
          type="primary"
          status="danger"
          size="small"
          @click="onResetClick"
        >
          {{ t('themeBox.resetTheme') }}
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Badge,
  Button,
  Modal,
  Row,
  Col,
  Card,
  CardMeta,
  Pagination,
  Skeleton,
  SkeletonLine,
  SkeletonShape,
  Notification,
  Tag,
  TypographyText,
  Input,
  Empty,
  Link,
} from '@arco-design/web-vue';
import { IconSkin, IconLink } from '@arco-design/web-vue/es/icon';
import axios from 'axios';
import { ThemeData } from './interface';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../utils/local-storage';
import { apiBasename } from '../../utils/api';

const THEME_LINK_ID = 'arco-custom-theme';
const loadingFillArray = Array(6).fill(1);

export default defineComponent({
  name: 'ThemeBox',
  components: {
    Badge,
    Button,
    Modal,
    Row,
    Col,
    Card,
    CardMeta,
    Pagination,
    Skeleton,
    SkeletonLine,
    SkeletonShape,
    Tag,
    TypographyText,
    Input,
    Empty,
    Link,
    IconSkin,
    IconLink,
  },
  setup() {
    const { t } = useI18n();
    const theme = ref<ThemeData>();
    const themeList = ref<ThemeData[]>([]);
    const total = ref(0);
    const page = ref(1);
    const modalVisible = ref(false);
    const searchValue = ref('');
    const isLoading = ref(false);
    const hover = ref(false);

    onMounted(() => {
      const _theme = getLocalStorage<ThemeData>(
        'vue-custom-theme',
        true
      ) as ThemeData;
      if (_theme) {
        useTheme(_theme, false);
      }
    });

    const useTheme = (_theme: ThemeData, notice = true) => {
      addTheme(_theme, notice);
      setLocalStorage('vue-custom-theme', _theme);
    };

    const fetchThemeList = async (current: number, search: string) => {
      isLoading.value = true;
      try {
        const data = await axios.get(
          `${apiBasename}/themes/api/open/themes/list?pageSize=6&currentPage=${current}&depLibrary=@arco-design/web-vue&keyword=${search}`
        );

        themeList.value = data.data.list;
        total.value = data.data.total;
      } catch {}
      isLoading.value = false;
    };

    watch(modalVisible, (visible) => {
      if (visible) {
        fetchThemeList(page.value, searchValue.value);
      }
    });

    const addTheme = (_theme: ThemeData, notice: boolean) => {
      const url = `${_theme.unpkgHost}${_theme.packageName}/css/arco.css`;
      axios
        .get(url)
        .then(() => {
          if (theme.value) {
            removeTheme();
          }
          const linkElement = document.createElement('link');
          linkElement.id = THEME_LINK_ID;
          linkElement.href = url;
          linkElement.type = 'text/css';
          linkElement.rel = 'stylesheet';
          document.body.appendChild(linkElement);
          theme.value = _theme;

          if (notice) {
            Notification.success({
              id: 'theme',
              title: t('themeBox.installTheme'),
              content: t('themeBox.installThemeSuccess'),
              duration: 2000,
            });
          }
        })
        .catch(() => {
          Notification.error({
            id: 'theme',
            title: t('themeBox.installTheme'),
            content: t('themeBox.installThemeError'),
            duration: 2000,
          });
        });
    };

    const removeTheme = () => {
      const linkElement = document.getElementById(THEME_LINK_ID);
      if (linkElement) {
        document.body.removeChild(linkElement);
      }
      theme.value = undefined;
    };

    const onResetClick = () => {
      removeTheme();
      removeLocalStorage('vue-custom-theme');
    };

    const onSearchInput = (value: string) => {
      searchValue.value = value;
      page.value = 1;
      fetchThemeList(1, value);
    };

    const onPageChange = (_page: number) => {
      page.value = _page;
      fetchThemeList(_page, searchValue.value);
    };

    return {
      hover,
      modalVisible,
      themeList,
      theme,
      total,
      page,
      isLoading,
      loadingFillArray,
      searchValue,
      useTheme,
      onSearchInput,
      onPageChange,
      onResetClick,
      t,
    };
  },
});
</script>

<style scoped lang="less">
.theme-box {
  &-header {
    width: 100%;
    padding-right: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-card {
    &-link {
      opacity: 0;
      transition: opacity 100ms;
    }

    &:hover &-link {
      opacity: 1;
    }

    :deep(.arco-card-meta-title) {
      line-height: 25px;
    }
  }

  &-bottom {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.theme-badge {
  position: fixed;
  right: 70px;
  bottom: 124px;

  &-button {
    background: var(--color-bg-5) !important;
    border: 1px solid var(--color-fill-3) !important;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
