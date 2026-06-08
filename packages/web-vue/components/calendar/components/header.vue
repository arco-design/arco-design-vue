<template>
  <div :class="`${prefixCls}__header`">
    <slot
      name="header"
      :view="view"
      :available-views="config.availableViews"
      :calendar="calendar"
    ></slot>

    <template v-if="!$slots.header">
      <div v-if="config.viewsBar" :class="`${prefixCls}__views-bar`">
        <button
          v-for="(obj, id) in config.availableViews"
          @click="view.switch(id)"
          :class="[
            `${prefixCls}__view-button`,
            { [`${prefixCls}__view-button--active`]: view.id === id },
          ]"
          type="button"
          >{{ calendar.texts[id] }}</button
        >
      </div>

      <nav v-if="config.titleBar" :class="`${prefixCls}__title-bar`">
        <button
          @click="view.previous"
          :class="[
            `${prefixCls}__nav`,
            `${prefixCls}__nav--prev`,
            { [`${prefixCls}__nav--default`]: !$slots['previous-button'] },
          ]"
          type="button"
        >
          <slot name="previous-button"></slot>
        </button>
        <div :class="`${prefixCls}__transition-wrap`">
          <transition :name="`${prefixCls}-slide-fade--${view.transitionDirection}`">
            <div :key="view.id + view.start.getTime()">
              <component
                :is="config.clickToNavigate && view.broaderView ? 'button' : 'div'"
                v-if="$slots.title || $slots[`title.${view.id}`]"
                v-on="titleEventHandlers"
                :class="`${prefixCls}__title`"
              >
                <slot
                  v-if="$slots[`title.${view.id}`]"
                  :name="`title.${view.id}`"
                  v-bind="view"
                ></slot>
                <slot v-else name="title" v-bind="view"></slot>
              </component>
              <component
                :is="config.clickToNavigate && view.broaderView ? 'button' : 'div'"
                v-else
                v-on="titleEventHandlers"
                :class="`${prefixCls}__title`"
                >{{ view.title
                }}<small v-if="view.titleWeekInfo"
                  >&nbsp;{{ view.titleWeekInfo.text }} {{ view.titleWeekInfo.number }}</small
                ></component
              >
            </div>
          </transition>
        </div>
        <template v-if="config.todayButton">
          <slot
            v-if="$slots['today-button']"
            name="today-button"
            :navigate="() => !view.containsToday && view.goToToday()"
            :active="view.containsToday"
          ></slot>
          <button
            v-else
            @click="!view.containsToday && view.goToToday()"
            :disabled="!!view.containsToday"
            :class="[
              `${prefixCls}__nav`,
              `${prefixCls}__nav--today`,
              `${prefixCls}__nav--default`,
              { [`${prefixCls}__nav--active`]: view.containsToday },
            ]"
            type="button"
            >{{ calendar.texts.today }}</button
          >
        </template>
        <button
          @click="view.next"
          :class="[
            `${prefixCls}__nav`,
            `${prefixCls}__nav--next`,
            { [`${prefixCls}__nav--default`]: !$slots['next-button'] },
          ]"
          type="button"
        >
          <slot name="next-button"></slot>
        </button>
      </nav>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue';

  import { calendarInjectionKey } from '../context';

  const calendar = inject(calendarInjectionKey)!;
  const { view, config } = calendar;
  const prefixCls = calendar.prefixCls;

  const onTitleClick = () => {
    if (config.clickToNavigate) view.broader();
  };

  const titleEventHandlers = computed(() =>
    config.clickToNavigate ? { click: onTitleClick } : {},
  );
</script>
