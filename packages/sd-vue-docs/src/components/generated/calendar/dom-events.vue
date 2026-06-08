<template>
  <!-- ========== 事件日志 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">Vue Cal 发出的事件</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      日历发出丰富的事件用于外部联动。下表交互会产生对应的 DOM 事件回调。
    </p>

    <div class="sd:flex sd:gap-2 sd:mb-3">
      <sd-button size="small" @click="clearLogs">清空日志</sd-button>
    </div>

    <div
      class="sd:mb-3 sd:rounded sd:border sd:bg-gray-50 sd:p-2 sd:text-xs sd:font-mono sd:overflow-auto"
      style="max-height: 160px; white-space: pre-wrap"
    >
      <div v-if="!logs.length" class="sd:text-gray-400">// 与下方日历互动以查看事件日志…</div>
      <div v-for="(log, i) in logs" :key="i" class="sd:mb-1">
        <span style="color: #3b82f6">{{ log.name }}</span
        >: {{ log.args }}
      </div>
    </div>

    <sd-calendar
      :time-from="7 * 60"
      :time-to="23 * 60"
      :views="['day', 'week', 'month']"
      editable-events
      :events="demoEvents"
      @ready="logEvent('ready', $event)"
      @view-change="logEvent('view-change', $event)"
      @event-create="logEvent('event-create', $event)"
      @event-click="logEvent('event-click', $event)"
      @event-dblclick="logEvent('event-dblclick', $event)"
      @event-drag-start="logEvent('event-drag-start', $event)"
      @event-drag-end="logEvent('event-drag-end', $event)"
      @event-drop="onEventDropLog"
      @event-resize="logEvent('event-resize', $event)"
      @event-delete="logEvent('event-delete', $event)"
      @cell-click="logEvent('cell-click', $event)"
      @cell-dblclick="logEvent('cell-dblclick', $event)"
      @cell-hold="logEvent('cell-hold', $event)"
      style="height: 460px"
    />
  </section>

  <!-- ========== 从后端加载事件 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">从"后端"加载事件</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      监听 <code>@view-change</code> 事件，根据当前视图的 <code>start</code> /
      <code>end</code> 日期范围，模拟从后端 API 获取并刷新事件列表。
    </p>

    <div class="sd:mb-3 sd:text-sm">
      <span v-if="loading" class="sd:text-blue-500">加载中...</span>
      <span v-else class="sd:text-gray-500">{{ backendEvents.length }} 条事件已加载</span>
    </div>

    <sd-calendar
      :events="backendEvents"
      :time-from="9 * 60"
      :time-to="18 * 60"
      :views-bar="false"
      @view-change="onViewChange"
      style="height: 480px"
    />
  </section>

  <!-- ========== 外部控件 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">外部控件控制日历</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      通过 <code>ref</code> 获取日历实例，调用
      <code>view.previous()</code>、<code>view.next()</code>、<code>view.goToToday()</code>
      等方法。也可通过 <code>v-model:view</code> 和 <code>v-model:view-date</code> 实现双向绑定。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-2 sd:mb-3">
      <sd-radio-group type="button" v-model="externalView">
        <sd-radio v-for="v in views" :key="v" :value="v">{{ v }}</sd-radio>
      </sd-radio-group>
    </div>

    <div class="sd:flex sd:gap-2 sd:mb-3">
      <sd-button size="small" @click="calRef?.view.previous()">◀ 上一个</sd-button>
      <sd-button size="small" @click="calRef?.view.goToToday()">📅 今天</sd-button>
      <sd-button size="small" @click="calRef?.view.next()">下一个 ▶</sd-button>
    </div>

    <sd-calendar
      ref="calRef"
      v-model:view="externalView"
      v-model:view-date="externalViewDate"
      :time="false"
      :views-bar="false"
      sm
      style="height: 380px"
    />
    <p class="sd:mt-2 sd:text-xs sd:text-gray-500">
      view: <code>{{ externalView }}</code> | viewDate: <code>{{ externalViewDate }}</code>
    </p>
  </section>

  <!-- ========== 同步两个日历 ========== -->
  <section class="sd:mb-8">
    <h3 class="sd:text-lg sd:font-semibold sd:mb-3">同步两个日历实例</h3>
    <p class="sd:mb-3 sd:text-sm sd:text-gray-600">
      左侧为日期选择器模式，选中日期后右侧主日历自动跳转到对应周，实现联动。
    </p>

    <div class="sd:flex sd:flex-wrap sd:gap-3">
      <sd-calendar
        date-picker
        :views-bar="false"
        :selected-date="syncedDate"
        @update:selected-date="
          syncedDate = $event;
          syncedViewDate = $event;
        "
        style="width: 260px; height: 350px"
      />
      <sd-calendar
        :view-date="syncedViewDate"
        :selected-date="syncedDate"
        @update:view-date="syncedViewDate = $event"
        :events="demoEvents"
        view="week"
        :views="['day', 'week']"
        :views-bar="false"
        sm
        style="flex: 1; min-width: 300px; height: 420px"
      />
    </div>
    <p class="sd:mt-2 sd:text-xs sd:text-gray-500">选中日期: {{ syncedDate }}</p>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const today = new Date();

  // ---------- 事件日志 ----------
  const logs = ref<Array<{ name: string; args: string }>>([]);
  type LogArg = Record<string, unknown>;

  const logEvent = (name: string, params: LogArg) => {
    const sanitized = { ...params };
    if ((sanitized as any).cell) {
      const cell = (sanitized as any).cell;
      (sanitized as any).cell = `[Cell] ${cell.formattedDate || cell.start}`;
    }
    if ((sanitized as any).e)
      (sanitized as any).e = `[${(sanitized as any).e?.constructor?.name || 'Event'}]`;
    if ((sanitized as any).event) {
      const ev = (sanitized as any).event;
      (sanitized as any).event = `"${ev.title || 'untitled'}"`;
    }
    logs.value.unshift({ name, args: JSON.stringify(sanitized, null, 2) });
    if (logs.value.length > 50) logs.value.pop();
  };

  const onEventDropLog = (params: any) => {
    logEvent('event-drop', params);
    return true;
  };

  const clearLogs = () => {
    logs.value = [];
  };

  // ---------- 从后端加载 ----------
  const loading = ref(false);
  const backendEvents = ref<Array<Record<string, any>>>([]);

  const generateEvents = (start: Date, end: Date) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const evts = [];
    for (let d = 0; d < Math.min(days, 14); d++) {
      const count = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < count; i++) {
        const hourStart = Math.floor(Math.random() * 8) + 9;
        const s = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + d,
          hourStart,
          Math.floor(Math.random() * 60),
        );
        const e = new Date(s.getTime() + 60 * 60 * 1000);
        evts.push({
          title: `事件 ${evts.length + 1}`,
          start: s,
          end: e,
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][
            Math.floor(Math.random() * 5)
          ],
          color: '#fff',
        });
      }
    }
    return evts;
  };

  const onViewChange = async (view: any) => {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 400));
    backendEvents.value = generateEvents(new Date(view.start), new Date(view.end));
    loading.value = false;
  };

  // ---------- 外部控件 ----------
  const calRef = ref<any>(null);
  const externalView = ref('month');
  const externalViewDate = ref('');
  const views = ['day', 'week', 'month', 'year', 'years'];

  // ---------- 同步两个日历 ----------
  const syncedDate = ref(new Date().toISOString().slice(0, 10));
  const syncedViewDate = ref(syncedDate.value);

  // ---------- 共享事件 ----------
  const demoEvents = [
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 9, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 11, 0),
      title: '需求评审',
      backgroundColor: '#3b82f6',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
      title: '技术讨论',
      backgroundColor: '#10b981',
      color: '#fff',
    },
    {
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
      end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
      title: '设计评审',
      backgroundColor: '#f59e0b',
      color: '#fff',
    },
  ];
</script>
