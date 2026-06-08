---
name: type-fest
description: TypeScript 类型工具集合使用指南。遇到复杂类型变换、深层可选/必填、互斥字段、精确对象约束、路径类型、JSON 类型、异步返回类型提取，或用户明确提到 type-fest、utility types、类型体操、typed helpers 时，优先使用这个 skill。对于本仓库中的 TypeScript 建模任务，只要内置工具类型不够直接或可读性变差，就应该考虑 type-fest。
---

# Type Fest

这个 skill 用来指导如何在本仓库里使用 type-fest 做类型建模，而不是重复发明一套项目内 utility types。

本仓库已满足 type-fest 的核心前提：

- 已安装 `type-fest` 依赖。
- TypeScript 版本为 5.9.x。
- `tsconfig.app.json` 与 `tsconfig.node.json` 已开启 `strict: true`。

因此，在这个仓库里优先直接导入需要的 type，而不是手写一份相近但不完全一致的工具类型。

## 什么时候用

出现以下情况时，优先考虑 type-fest：

- 需要比内置 `Omit`、`Partial`、`Readonly` 更严格或更深层的版本。
- 需要表达“至少一个字段”“只能有一个字段”“要么全有要么全无”这类约束。
- 需要组合、覆盖、深合并、提取条件字段、递归改写对象结构。
- 需要把类型提示整理得更可读，或者修复复杂交叉类型带来的提示噪音。
- 需要路径类型、深层取值类型、JSON 类型、标签类型、异步返回值类型。
- 用户明确要求使用 `type-fest`，或者当前文件已经在使用它。

以下情况不要为了“炫技”引入 type-fest：

- 内置 TypeScript 工具类型已经足够清晰。
- 只是一个简单的一层 `Pick`、`Omit`、`Partial`。
- 复杂类型会明显损害可读性，且没有带来明确约束收益。

## 使用规则

- 始终按需导入，避免整包导入。
- 优先使用 `import type { ... } from 'type-fest';`。
- 先选最浅的一层工具，只有业务明确需要递归行为时再上 `Deep` 版本。
- 多个工具叠加后如果提示类型变得难读，补一个 `Simplify` 或 `SimplifyDeep`。
- 新增类型别名时，名称要表达业务意图，不要把 `RequireExactlyOne<Foo, 'a' | 'b'>` 直接暴露给业务层反复书写。
- 不要为了“绝对类型完美”把运行时可维护性拖垮。类型应服务于约束和可读性。

## 选型顺序

做类型建模时按这个顺序判断：

1. 内置工具类型能否直接解决。
2. type-fest 是否已有清晰、成熟的现成类型。
3. 如果 type-fest 可以解决，导入最小集合。
4. 如果组合后可读性下降，用业务语义化别名包一层。
5. 如果 type-fest 也不合适，再写项目内自定义类型。

## 高频类型速查

### 对象字段约束

- `Except<T, K>`：更严格的 `Omit`。
- `Merge<A, B>`：用 B 覆盖 A。
- `MergeDeep<A, B>`：递归深合并。
- `OverrideProperties<T, U>`：只允许覆盖 T 里本来就存在的字段。
- `RequireAtLeastOne<T, Keys>`：至少一个字段必填。
- `RequireExactlyOne<T, Keys>`：多个候选字段中只能有一个。
- `RequireAllOrNone<T, Keys>`：这些字段要么全传，要么都不传。
- `RequireOneOrNone<T, Keys>`：这些字段里最多一个，或者一个都没有。
- `SingleKeyObject<T>`：对象只能有一个 key。
- `Exact<T, Shape>`：禁止多余字段。

### 深层结构改写

- `PartialDeep<T>`：深层可选。
- `RequiredDeep<T>`：深层必填。
- `ReadonlyDeep<T>`：深层只读。
- `WritableDeep<T>`：去掉深层只读。
- `PickDeep<T, Keys>`：深层挑字段。
- `OmitDeep<T, Keys>`：深层删字段。
- `SetRequiredDeep<T, Keys>`：将指定深层路径改为必填。
- `SetNonNullableDeep<T, Keys>`：将指定深层路径改为非空。

### 条件提取与键分析

- `ConditionalPick<T, Condition>`：按 value 类型筛字段。
- `ConditionalExcept<T, Condition>`：按 value 类型排除字段。
- `ConditionalPickDeep<T, Condition>`：深层条件提取。
- `ConditionalKeys<T, Condition>`：提取满足条件的 key。
- `KeysOfUnion<T>`：联合类型的全部 key。
- `OptionalKeysOf<T>`、`RequiredKeysOf<T>`：提取可选或必填键。

### 可读性与推导整理

- `Simplify<T>`：拍平交叉类型，改善编辑器提示。
- `SimplifyDeep<T>`：深层拍平。
- `ValueOf<T>`：对象 value 的联合类型。
- `Entries<T>`、`Entry<T>`：推导 `Object.entries` 风格的条目类型。
- `Spread<A, B>`：模拟对象或数组展开后的推导。

### 路径与访问

- `Paths<T>`：对象所有可访问路径。
- `Get<T, Path>`：按路径取深层字段类型。
- `KeyAsString<T>`：把 key 统一为字符串字面量。

### 函数与异步

- `Promisable<T>`：`T | PromiseLike<T>`。
- `AsyncReturnType<F>`：异步函数的最终返回类型。
- `Asyncify<F>`：把同步函数类型改成异步版。
- `SetReturnType<F, R>`：替换函数返回类型。
- `SetParameterType<F, P>`：替换部分参数类型。

### JSON 与通用数据结构

- `JsonValue`、`JsonObject`、`JsonArray`：描述合法 JSON。
- `Jsonify<T>`：把类型改造成可序列化 JSON 结构。
- `Jsonifiable`：可无损转 JSON 的值。
- `UnknownRecord`：比 `{}` 更安全的对象类型。
- `UnknownArray`：`unknown[]` 的语义化别名。
- `Arrayable<T>`：`T | T[]`。

### 联合与品牌类型

- `Tagged<T, Tag>`：品牌类型或标签类型。
- `UnwrapTagged<T>`：拿回原始类型。
- `TaggedUnion<K, Members>`：共享判别字段的联合类型。
- `SharedUnionFields<T>`：联合成员的公共字段。
- `DistributedPick<T, K>`、`DistributedOmit<T, K>`：对联合类型分发式 pick/omit。

## 常见替换策略

- 需要更严格的 `Omit`：用 `Except`，不要继续堆原生 `Omit`。
- 需要“字段至少填一个”：用 `RequireAtLeastOne`，不要写手搓联合类型。
- 需要“账号密码”和“token”二选一：用 `RequireExactlyOne` 或 `RequireOneOrNone`。
- 需要递归配置对象可选：用 `PartialDeep`，不要自己手写递归 mapped type。
- 需要干净的 IDE 提示：在最终结果外层包 `Simplify`。
- 需要接口路径字面量：用 `Paths` + `Get`。
- 需要 JSON 存储或接口缓存结构：用 `JsonValue` 或 `Jsonify`。

## 推荐写法

```ts
import type { Except, RequireExactlyOne, PartialDeep, Simplify } from 'type-fest';

type BaseQuery = {
  keyword?: string;
  hostId?: string;
  ip?: string;
  page: number;
  pageSize: number;
};

type SearchTarget = RequireExactlyOne<
  {
    hostId?: string;
    ip?: string;
  },
  'hostId' | 'ip'
>;

type SearchParams = Simplify<Except<BaseQuery, 'hostId' | 'ip'> & SearchTarget>;

type PatchPayload = PartialDeep<{
  name: string;
  options: {
    timeout: number;
    tags: string[];
  };
}>;
```

推荐理由：

- 业务语义清晰。
- 约束集中在类型层，不需要额外手写说明。
- `Simplify` 把最终提示整理成可读结构。

## 不推荐写法

```ts
type Bad =
  | ({ hostId: string; ip?: never } & BaseQuery)
  | ({ ip: string; hostId?: never } & BaseQuery);
```

这个写法不是不能用，而是不应在 type-fest 已经提供更成熟表达时继续扩散手写模式。

## 与本仓库协作时的要求

- 修改现有业务类型时，先搜索文件里是否已经有项目内同类 helper，避免同一语义出现两套实现。
- 如果只是局部文件需要一个复杂类型，优先在当前文件内 `import type` 后声明业务别名，不要立刻新增全局 types 文件。
- 如果一个模式会在多个模块重复出现，再考虑抽到公共类型定义。
- Vue 组件、Pinia store、API DTO、表格列配置、表单 schema 都适合用 type-fest 做静态约束，但不要让模板层读到过于复杂的裸类型表达式。

## 需要进一步查阅时

完整 API 清单保存在同目录的 [readme.md](readme.md)。

遇到下面这些场景时，先读 readme 再继续：

- 你知道需要某一类工具，但不记得精确名字。
- 需要字符串变换、数组元组、数字区间、大小写变换这类偏冷门类型。
- 需要确认某个工具是否有更严格、深层或分发式版本。

优先先看这些分类：

- Basic / Utilities：常规对象和字段约束。
- Type Guard：类型判断类工具。
- JSON / Async / String / Array / Numeric：专项能力。
- Change case：字符串大小写和命名风格转换。

## 输出期望

使用这个 skill 时，最终产出应满足：

- 选型理由明确。
- 类型表达尽量短而可读。
- 导入最小化。
- 不重复实现 type-fest 已提供的能力。
- 如有必要，为复杂表达补一个业务语义化 `type` 别名。
