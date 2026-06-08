<template>
  <!-- ========== 创建事件 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">创建事件</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      设置 <code>editable-events</code> 后，默认通过
      <strong>点击拖动</strong> 在单元格上创建事件。也可更精细地控制权限：<code
        >{ create, resize, drag, delete }</code
      >。通过 <code>snap-to-interval</code> 可使事件开始/结束对齐到指定分钟间隔。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-3 sd:mb-3 sd:items-center">
      <sd-checkbox v-model="snapToInterval">对齐到 15 分钟</sd-checkbox>
      <sd-checkbox v-model="canCreate">允许创建</sd-checkbox>
      <sd-checkbox v-model="canResize">允许缩放</sd-checkbox>
      <sd-checkbox v-model="canDrag">允许拖拽</sd-checkbox>
      <sd-checkbox v-model="canDelete">允许删除</sd-checkbox>
    </div>

    <sd-calendar
      :editable-events="editableEventsConfig"
      :snap-to-interval="snapToInterval ? 15 : 0"
      :events="createEvents"
      :time-from="9 * 60"
      :time-to="15 * 60"
      :views="{ days: { cols: 5, rows: 1 } }"
      view="days"
      :views-bar="false"
      style="height: 320px"
    />
    <p class="sd:mt-1 sd:text-xs sd:text-gray-400"
      >提示: 点击并拖动某个时间段即可创建事件；双击事件可删除。</p
    >
  </section>

  <!-- ========== 事件 v-model ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">事件 v-model 双向绑定</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过
      <code>v-model:events</code>
      实现事件数组的双向绑定，外部修改会自动反映到日历中。下方列表展示当前事件，并可与日历互动。
    </p>

    <div class="sd:flex sd:gap-2 sd:mb-3">
      <sd-button size="small" status="success" @click="addEvent">+ 添加事件</sd-button>
      <sd-button size="small" status="danger" @click="vModelEvents.pop()">移除最后</sd-button>
    </div>

    <div class="sd:mb-3 sd:flex sd:flex-wrap sd:gap-2">
      <sd-tag v-for="(event, i) in vModelEvents" :key="i" :color="event.backgroundColor">
        {{ event.title }}
      </sd-tag>
      <span v-if="!vModelEvents.length" class="sd:text-xs sd:text-gray-400">暂无事件</span>
    </div>

    <sd-calendar
      v-model:events="vModelEvents"
      editable-events
      :time-from="9 * 60"
      :views="{ days: { cols: 5, rows: 1 } }"
      view="days"
      :views-bar="false"
      style="height: 320px"
      @event-create="onVModelEventCreate"
    />
  </section>

  <!-- ========== 拖拽事件 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">事件拖拽 (Drag & Drop)</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      单天前景事件支持 HTML5 原生拖拽。拖拽时原事件获得
      <code>.sd-calendar__event--dragging-original</code> 类，幽灵元素获得
      <code>.sd-calendar__event--dragging-ghost</code> 类。通过 <code>@event-drop</code> 可返回
      <code>false</code> 拒绝放置。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-3 sd:mb-3">
      <sd-checkbox v-model="dragEnabled">允许拖拽</sd-checkbox>
      <sd-checkbox v-model="snapDragToHour">对齐到整点</sd-checkbox>
    </div>

    <sd-calendar
      :editable-events="{ drag: dragEnabled }"
      :snap-to-interval="snapDragToHour ? 60 : 0"
      :events="dragEvents"
      :time-from="9 * 60"
      :time-to="15 * 60"
      :views="{ days: { cols: 5, rows: 1 } }"
      view="days"
      :views-bar="false"
      style="height: 340px"
    />
  </section>

  <!-- ========== 事件响应性 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">事件响应性</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      事件数组是响应式的 — 外部修改事件的属性（如
      <code>backgroundColor</code>）会实时反映在日历中。下方示例每秒随机变换事件背景色。
    </p>

    <sd-calendar
      :events="reactiveEvents"
      editable-events
      :time-from="9 * 60"
      :time-to="15 * 60"
      :views="{ days: { cols: 3, rows: 1 } }"
      view="days"
      :views-bar="false"
      style="height: 280px"
    />
  </section>

  <!-- ========== 拒绝拖拽/缩放重叠 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">拒绝拖拽/缩放重叠</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>@event-drop</code> 和 <code>@event-resize</code> 返回
      <code>false</code> 可拒绝冲突的拖拽或缩放操作。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-3 sd:mb-3">
      <sd-checkbox v-model="preventOverlapDrop">拖拽时拒绝重叠</sd-checkbox>
      <sd-checkbox v-model="preventOverlapResize">缩放时拒绝重叠</sd-checkbox>
    </div>

    <sd-calendar
      :events="rejectOverlapEvents"
      editable-events
      @event-drop="onEventDrop"
      @event-resize="onEventResize"
      :time-from="9 * 60"
      :time-to="15 * 60"
      style="height: 340px"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue';

  const today = new Date();

  // ---------- 创建事件 ----------
  const snapToInterval = ref(false);
  const canCreate = ref(true);
  const canResize = ref(false);
  const canDrag = ref(false);
  const canDelete = ref(true);
  const editableEventsConfig = computed(() => ({
    create: canCreate.value,
    resize: canResize.value,
    drag: canDrag.value,
    delete: canDelete.value,
  }));
  const createEvents = ref([
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
      title: '团队例会',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 30),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 13, 30),
      title: '医生预约',
      backgroundColor: '#57cea9cc',
      color: '#fff',
    },
  ]);

  // ---------- v-model 事件 ----------
  const eventCounter = ref(2);
  const vModelEvents = ref([
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      title: '事件 1',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 15, 0),
      title: '事件 2',
      backgroundColor: '#10b981',
      color: '#fff',
    },
  ]);
  const onVModelEventCreate = ({ event, resolve }: { event: any; resolve: (e: any) => void }) => {
    eventCounter.value++;
    resolve({
      ...event,
      title: event.title || `事件 ${eventCounter.value}`,
      backgroundColor: event.backgroundColor || '#f59e0b',
      color: event.color || '#fff',
    });
  };

  const addEvent = () => {
    eventCounter.value++;

    const lastEvent = vModelEvents.value[vModelEvents.value.length - 1];
    const lastEventEnd = lastEvent ? new Date(lastEvent.end) : new Date();

    vModelEvents.value.push({
      start: lastEventEnd
        ? new Date(lastEventEnd)
        : new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      end: lastEventEnd
        ? new Date(
            lastEventEnd.getFullYear(),
            lastEventEnd.getMonth(),
            lastEventEnd.getDate(),
            lastEventEnd.getHours() + 1,
            lastEventEnd.getMinutes(),
            lastEventEnd.getSeconds(),
          )
        : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0), // will be adjusted
      // @ts-ignore
      title: `事件 ${eventCounter.value}`,
      backgroundColor: '#f59e0b',
      color: '#fff',
    });
  };

  // ---------- 拖拽事件 ----------
  const dragEnabled = ref(true);
  const snapDragToHour = ref(false);
  const dragEvents = ref([
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
      title: '可拖拽事件',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0),
      title: '另一个事件',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 0),
      title: '固定事件',
      backgroundColor: '#8b5cf6',
      color: '#fff',
      draggable: false,
      deletable: false,
      resizable: false,
    },
  ]);

  // ---------- 响应性 ----------
  const colors = ['crimson', 'cornflowerblue', 'darkgreen', 'blueviolet', 'darkmagenta', 'teal'];
  const reactiveEvents = ref([
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 11, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 12, 30),
      title: '事件 A',
      backgroundColor: 'crimson',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 15, 30),
      title: '事件 B',
      backgroundColor: 'cornflowerblue',
      color: '#fff',
    },
  ]);
  let colorInterval: ReturnType<typeof setInterval> | null = null;
  onMounted(() => {
    colorInterval = setInterval(() => {
      if (reactiveEvents.value[0]) {
        reactiveEvents.value[0].backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      }
      if (reactiveEvents.value[1]) {
        reactiveEvents.value[1].backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      }
    }, 1000);
  });
  onUnmounted(() => {
    if (colorInterval) clearInterval(colorInterval);
  });

  // ---------- 拒绝重叠 ----------
  const preventOverlapDrop = ref(true);
  const preventOverlapResize = ref(true);
  const rejectOverlapEvents = ref([
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
      title: '事件 1',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
      title: '事件 2',
      backgroundColor: '#10b981',
      color: '#fff',
    },
  ]);
  const onEventDrop = ({ overlaps }: { overlaps: any[] }) => {
    if (preventOverlapDrop.value && overlaps && overlaps.length) return false;
    return true;
  };
  const onEventResize = ({ overlaps }: { overlaps: any[] }) => {
    if (preventOverlapResize.value && overlaps && overlaps.length) return false;
    return true;
  };
</script>

<style lang="css">
  .sd-calendar__event {
    transition: background-color 1s;
  }
</style>
