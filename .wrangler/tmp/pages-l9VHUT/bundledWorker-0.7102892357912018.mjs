var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../.wrangler/tmp/bundle-BtH4ep/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init2) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init2) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init2] = argArray;
    checkURL(request, init2);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// _worker.js
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
}, "__init"), "__esm");
var __commonJS = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "__require"), "__commonJS");
var __export = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, "__export");
var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp2(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
)), "__toESM");
var DEV;
var init_node = __esm({
  ".svelte-kit/output/server/chunks/node.js"() {
    DEV = false;
  }
});
function equals(value) {
  return value === this.v;
}
__name(equals, "equals");
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
__name(safe_not_equal, "safe_not_equal");
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}
__name(safe_equals, "safe_equals");
function effect_update_depth_exceeded() {
  {
    throw new Error("effect_update_depth_exceeded");
  }
}
__name(effect_update_depth_exceeded, "effect_update_depth_exceeded");
function hydration_failed() {
  {
    throw new Error("hydration_failed");
  }
}
__name(hydration_failed, "hydration_failed");
function state_unsafe_local_read() {
  {
    throw new Error("state_unsafe_local_read");
  }
}
__name(state_unsafe_local_read, "state_unsafe_local_read");
function state_unsafe_mutation() {
  {
    throw new Error("state_unsafe_mutation");
  }
}
__name(state_unsafe_mutation, "state_unsafe_mutation");
function source(v) {
  return {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    version: 0
  };
}
__name(source, "source");
function mutable_source(initial_value, immutable2 = false) {
  const s3 = source(initial_value);
  if (!immutable2) {
    s3.equals = safe_equals;
  }
  if (component_context !== null && component_context.l !== null) {
    (component_context.l.s ??= []).push(s3);
  }
  return s3;
}
__name(mutable_source, "mutable_source");
function set(source2, value) {
  if (active_reaction !== null && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (derived_sources === null || !derived_sources.includes(source2))) {
    state_unsafe_mutation();
  }
  return internal_set(source2, value);
}
__name(set, "set");
function internal_set(source2, value) {
  if (!source2.equals(value)) {
    source2.v = value;
    source2.version = increment_version();
    mark_reactions(source2, DIRTY);
    if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & BRANCH_EFFECT) === 0) {
      if (new_deps !== null && new_deps.includes(source2)) {
        set_signal_status(active_effect, DIRTY);
        schedule_effect(active_effect);
      } else {
        if (untracked_writes === null) {
          set_untracked_writes([source2]);
        } else {
          untracked_writes.push(source2);
        }
      }
    }
  }
  return value;
}
__name(internal_set, "internal_set");
function mark_reactions(signal, status) {
  var reactions = signal.reactions;
  if (reactions === null)
    return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0)
      continue;
    if (!runes && reaction === active_effect)
      continue;
    set_signal_status(reaction, status);
    if ((flags & (CLEAN | UNOWNED)) !== 0) {
      if ((flags & DERIVED) !== 0) {
        mark_reactions(
          /** @type {Derived} */
          reaction,
          MAYBE_DIRTY
        );
      } else {
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
__name(mark_reactions, "mark_reactions");
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  element_prototype.__click = void 0;
  element_prototype.__className = "";
  element_prototype.__attributes = null;
  element_prototype.__styles = null;
  element_prototype.__e = void 0;
  Text.prototype.__t = void 0;
}
__name(init_operations, "init_operations");
function create_text(value = "") {
  return document.createTextNode(value);
}
__name(create_text, "create_text");
function get_first_child(node) {
  return first_child_getter.call(node);
}
__name(get_first_child, "get_first_child");
function get_next_sibling(node) {
  return next_sibling_getter.call(node);
}
__name(get_next_sibling, "get_next_sibling");
function clear_text_content(node) {
  node.textContent = "";
}
__name(clear_text_content, "clear_text_content");
function destroy_derived_children(derived) {
  var children = derived.children;
  if (children !== null) {
    derived.children = null;
    for (var i = 0; i < children.length; i += 1) {
      var child = children[i];
      if ((child.f & DERIVED) !== 0) {
        destroy_derived(
          /** @type {Derived} */
          child
        );
      } else {
        destroy_effect(
          /** @type {Effect} */
          child
        );
      }
    }
  }
}
__name(destroy_derived_children, "destroy_derived_children");
function execute_derived(derived) {
  var value;
  var prev_active_effect = active_effect;
  set_active_effect(derived.parent);
  {
    try {
      destroy_derived_children(derived);
      value = update_reaction(derived);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
__name(execute_derived, "execute_derived");
function update_derived(derived) {
  var value = execute_derived(derived);
  var status = (skip_reaction || (derived.f & UNOWNED) !== 0) && derived.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(derived, status);
  if (!derived.equals(value)) {
    derived.v = value;
    derived.version = increment_version();
  }
}
__name(update_derived, "update_derived");
function destroy_derived(signal) {
  destroy_derived_children(signal);
  remove_reactions(signal, 0);
  set_signal_status(signal, DESTROYED);
  signal.v = signal.children = signal.deps = signal.ctx = signal.reactions = null;
}
__name(destroy_derived, "destroy_derived");
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
__name(push_effect, "push_effect");
function create_effect(type, fn, sync, push2 = true) {
  var is_root = (type & ROOT_EFFECT) !== 0;
  var parent_effect = active_effect;
  var effect2 = {
    ctx: component_context,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: type | DIRTY,
    first: null,
    fn,
    last: null,
    next: null,
    parent: is_root ? null : parent_effect,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (sync) {
    var previously_flushing_effect = is_flushing_effect;
    try {
      set_is_flushing_effect(true);
      update_effect(effect2);
      effect2.f |= EFFECT_RAN;
    } catch (e3) {
      destroy_effect(effect2);
      throw e3;
    } finally {
      set_is_flushing_effect(previously_flushing_effect);
    }
  } else if (fn !== null) {
    schedule_effect(effect2);
  }
  var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & EFFECT_HAS_DERIVED) === 0;
  if (!inert && !is_root && push2) {
    if (parent_effect !== null) {
      push_effect(effect2, parent_effect);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
      var derived = (
        /** @type {Derived} */
        active_reaction
      );
      (derived.children ??= []).push(effect2);
    }
  }
  return effect2;
}
__name(create_effect, "create_effect");
function effect_root(fn) {
  const effect2 = create_effect(ROOT_EFFECT, fn, true);
  return () => {
    destroy_effect(effect2);
  };
}
__name(effect_root, "effect_root");
function effect(fn) {
  return create_effect(EFFECT, fn, false);
}
__name(effect, "effect");
function branch(fn, push2 = true) {
  return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
}
__name(branch, "branch");
function execute_effect_teardown(effect2) {
  var teardown = effect2.teardown;
  if (teardown !== null) {
    const previous_reaction = active_reaction;
    set_active_reaction(null);
    try {
      teardown.call(null);
    } finally {
      set_active_reaction(previous_reaction);
    }
  }
}
__name(execute_effect_teardown, "execute_effect_teardown");
function destroy_effect_deriveds(signal) {
  var deriveds = signal.deriveds;
  if (deriveds !== null) {
    signal.deriveds = null;
    for (var i = 0; i < deriveds.length; i += 1) {
      destroy_derived(deriveds[i]);
    }
  }
}
__name(destroy_effect_deriveds, "destroy_effect_deriveds");
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    var next = effect2.next;
    destroy_effect(effect2, remove_dom);
    effect2 = next;
  }
}
__name(destroy_effect_children, "destroy_effect_children");
function destroy_block_effect_children(signal) {
  var effect2 = signal.first;
  while (effect2 !== null) {
    var next = effect2.next;
    if ((effect2.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect2);
    }
    effect2 = next;
  }
}
__name(destroy_block_effect_children, "destroy_block_effect_children");
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
    var node = effect2.nodes_start;
    var end = effect2.nodes_end;
    while (node !== null) {
      var next = node === end ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(node)
      );
      node.remove();
      node = next;
    }
    removed = true;
  }
  destroy_effect_children(effect2, remove_dom && !removed);
  destroy_effect_deriveds(effect2);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  var transitions = effect2.transitions;
  if (transitions !== null) {
    for (const transition of transitions) {
      transition.stop();
    }
  }
  execute_effect_teardown(effect2);
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.parent = effect2.fn = effect2.nodes_start = effect2.nodes_end = null;
}
__name(destroy_effect, "destroy_effect");
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next = effect2.next;
  if (prev !== null)
    prev.next = next;
  if (next !== null)
    next.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2)
      parent.first = next;
    if (parent.last === effect2)
      parent.last = prev;
  }
}
__name(unlink_effect, "unlink_effect");
function flush_tasks() {
}
__name(flush_tasks, "flush_tasks");
function lifecycle_outside_component(name) {
  {
    throw new Error("lifecycle_outside_component");
  }
}
__name(lifecycle_outside_component, "lifecycle_outside_component");
function set_is_flushing_effect(value) {
  is_flushing_effect = value;
}
__name(set_is_flushing_effect, "set_is_flushing_effect");
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
__name(set_active_reaction, "set_active_reaction");
function set_active_effect(effect2) {
  active_effect = effect2;
}
__name(set_active_effect, "set_active_effect");
function set_untracked_writes(value) {
  untracked_writes = value;
}
__name(set_untracked_writes, "set_untracked_writes");
function increment_version() {
  return ++current_version;
}
__name(increment_version, "increment_version");
function is_runes() {
  return component_context !== null && component_context.l === null;
}
__name(is_runes, "is_runes");
function check_dirtiness(reaction) {
  var flags = reaction.f;
  if ((flags & DIRTY) !== 0) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    var dependencies = reaction.deps;
    var is_unowned = (flags & UNOWNED) !== 0;
    if (dependencies !== null) {
      var i;
      if ((flags & DISCONNECTED) !== 0) {
        for (i = 0; i < dependencies.length; i++) {
          (dependencies[i].reactions ??= []).push(reaction);
        }
        reaction.f ^= DISCONNECTED;
      }
      for (i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];
        if (check_dirtiness(
          /** @type {Derived} */
          dependency
        )) {
          update_derived(
            /** @type {Derived} */
            dependency
          );
        }
        if (is_unowned && active_effect !== null && !skip_reaction && !dependency?.reactions?.includes(reaction)) {
          (dependency.reactions ??= []).push(reaction);
        }
        if (dependency.version > reaction.version) {
          return true;
        }
      }
    }
    if (!is_unowned) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
__name(check_dirtiness, "check_dirtiness");
function handle_error(error, effect2, component_context2) {
  {
    throw error;
  }
}
__name(handle_error, "handle_error");
function update_reaction(reaction) {
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_skip_reaction = skip_reaction;
  var prev_derived_sources = derived_sources;
  var previous_component_context = component_context;
  var flags = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  skip_reaction = !is_flushing_effect && (flags & UNOWNED) !== 0;
  derived_sources = null;
  component_context = reaction.ctx;
  try {
    var result = (
      /** @type {Function} */
      (0, reaction.fn)()
    );
    var deps = reaction.deps;
    if (new_deps !== null) {
      var i;
      remove_reactions(reaction, skipped_deps);
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (!skip_reaction) {
        for (i = skipped_deps; i < deps.length; i++) {
          (deps[i].reactions ??= []).push(reaction);
        }
      }
    } else if (deps !== null && skipped_deps < deps.length) {
      remove_reactions(reaction, skipped_deps);
      deps.length = skipped_deps;
    }
    return result;
  } finally {
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    skip_reaction = previous_skip_reaction;
    derived_sources = prev_derived_sources;
    component_context = previous_component_context;
  }
}
__name(update_reaction, "update_reaction");
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index8 = reactions.indexOf(signal);
    if (index8 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index8] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !new_deps.includes(dependency))) {
    set_signal_status(dependency, MAYBE_DIRTY);
    if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
      dependency.f ^= DISCONNECTED;
    }
    remove_reactions(
      /** @type {Derived} **/
      dependency,
      0
    );
  }
}
__name(remove_reaction, "remove_reaction");
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null)
    return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
__name(remove_reactions, "remove_reactions");
function update_effect(effect2) {
  var flags = effect2.f;
  if ((flags & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  active_effect = effect2;
  try {
    if ((flags & BLOCK_EFFECT) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    destroy_effect_deriveds(effect2);
    execute_effect_teardown(effect2);
    var teardown = update_reaction(effect2);
    effect2.teardown = typeof teardown === "function" ? teardown : null;
    effect2.version = current_version;
    if (DEV)
      ;
  } catch (error) {
    handle_error(
      /** @type {Error} */
      error
    );
  } finally {
    active_effect = previous_effect;
  }
}
__name(update_effect, "update_effect");
function infinite_loop_guard() {
  if (flush_count > 1e3) {
    flush_count = 0;
    {
      effect_update_depth_exceeded();
    }
  }
  flush_count++;
}
__name(infinite_loop_guard, "infinite_loop_guard");
function flush_queued_root_effects(root_effects) {
  var length = root_effects.length;
  if (length === 0) {
    return;
  }
  infinite_loop_guard();
  var previously_flushing_effect = is_flushing_effect;
  is_flushing_effect = true;
  try {
    for (var i = 0; i < length; i++) {
      var effect2 = root_effects[i];
      if ((effect2.f & CLEAN) === 0) {
        effect2.f ^= CLEAN;
      }
      var collected_effects = [];
      process_effects(effect2, collected_effects);
      flush_queued_effects(collected_effects);
    }
  } finally {
    is_flushing_effect = previously_flushing_effect;
  }
}
__name(flush_queued_root_effects, "flush_queued_root_effects");
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0)
    return;
  for (var i = 0; i < length; i++) {
    var effect2 = effects[i];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && check_dirtiness(effect2)) {
      update_effect(effect2);
      if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
        if (effect2.teardown === null) {
          unlink_effect(effect2);
        } else {
          effect2.fn = null;
        }
      }
    }
  }
}
__name(flush_queued_effects, "flush_queued_effects");
function process_deferred() {
  is_micro_task_queued = false;
  if (flush_count > 1001) {
    return;
  }
  const previous_queued_root_effects = queued_root_effects;
  queued_root_effects = [];
  flush_queued_root_effects(previous_queued_root_effects);
  if (!is_micro_task_queued) {
    flush_count = 0;
  }
}
__name(process_deferred, "process_deferred");
function schedule_effect(signal) {
  if (scheduler_mode === FLUSH_MICROTASK) {
    if (!is_micro_task_queued) {
      is_micro_task_queued = true;
      queueMicrotask(process_deferred);
    }
  }
  var effect2 = signal;
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags = effect2.f;
    if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
      if ((flags & CLEAN) === 0)
        return;
      effect2.f ^= CLEAN;
    }
  }
  queued_root_effects.push(effect2);
}
__name(schedule_effect, "schedule_effect");
function process_effects(effect2, collected_effects) {
  var current_effect = effect2.first;
  var effects = [];
  main_loop:
    while (current_effect !== null) {
      var flags = current_effect.f;
      var is_branch = (flags & BRANCH_EFFECT) !== 0;
      var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
      if (!is_skippable_branch && (flags & INERT) === 0) {
        if ((flags & RENDER_EFFECT) !== 0) {
          if (is_branch) {
            current_effect.f ^= CLEAN;
          } else if (check_dirtiness(current_effect)) {
            update_effect(current_effect);
          }
          var child = current_effect.first;
          if (child !== null) {
            current_effect = child;
            continue;
          }
        } else if ((flags & EFFECT) !== 0) {
          effects.push(current_effect);
        }
      }
      var sibling = current_effect.next;
      if (sibling === null) {
        let parent = current_effect.parent;
        while (parent !== null) {
          if (effect2 === parent) {
            break main_loop;
          }
          var parent_sibling = parent.next;
          if (parent_sibling !== null) {
            current_effect = parent_sibling;
            continue main_loop;
          }
          parent = parent.parent;
        }
      }
      current_effect = sibling;
    }
  for (var i = 0; i < effects.length; i++) {
    child = effects[i];
    collected_effects.push(child);
    process_effects(child, collected_effects);
  }
}
__name(process_effects, "process_effects");
function flush_sync(fn) {
  var previous_scheduler_mode = scheduler_mode;
  var previous_queued_root_effects = queued_root_effects;
  try {
    infinite_loop_guard();
    const root_effects = [];
    scheduler_mode = FLUSH_SYNC;
    queued_root_effects = root_effects;
    is_micro_task_queued = false;
    flush_queued_root_effects(previous_queued_root_effects);
    var result = fn?.();
    flush_tasks();
    if (queued_root_effects.length > 0 || root_effects.length > 0) {
      flush_sync();
    }
    flush_count = 0;
    if (DEV)
      ;
    return result;
  } finally {
    scheduler_mode = previous_scheduler_mode;
    queued_root_effects = previous_queued_root_effects;
  }
}
__name(flush_sync, "flush_sync");
function get(signal) {
  var flags = signal.f;
  var is_derived = (flags & DERIVED) !== 0;
  if (is_derived && (flags & DESTROYED) !== 0) {
    var value = execute_derived(
      /** @type {Derived} */
      signal
    );
    destroy_derived(
      /** @type {Derived} */
      signal
    );
    return value;
  }
  if (active_reaction !== null) {
    if (derived_sources !== null && derived_sources.includes(signal)) {
      state_unsafe_local_read();
    }
    var deps = active_reaction.deps;
    if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
      skipped_deps++;
    } else if (new_deps === null) {
      new_deps = [signal];
    } else {
      new_deps.push(signal);
    }
    if (untracked_writes !== null && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & BRANCH_EFFECT) === 0 && untracked_writes.includes(signal)) {
      set_signal_status(active_effect, DIRTY);
      schedule_effect(active_effect);
    }
  } else if (is_derived && /** @type {Derived} */
  signal.deps === null) {
    var derived = (
      /** @type {Derived} */
      signal
    );
    var parent = derived.parent;
    if (parent !== null && !parent.deriveds?.includes(derived)) {
      (parent.deriveds ??= []).push(derived);
    }
  }
  if (is_derived) {
    derived = /** @type {Derived} */
    signal;
    if (check_dirtiness(derived)) {
      update_derived(derived);
    }
  }
  return signal.v;
}
__name(get, "get");
function untrack(fn) {
  const previous_reaction = active_reaction;
  try {
    active_reaction = null;
    return fn();
  } finally {
    active_reaction = previous_reaction;
  }
}
__name(untrack, "untrack");
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
__name(set_signal_status, "set_signal_status");
function push$1(props, runes = false, fn) {
  component_context = {
    p: component_context,
    c: null,
    e: null,
    m: false,
    s: props,
    x: null,
    l: null
  };
  if (!runes) {
    component_context.l = {
      s: null,
      u: null,
      r1: [],
      r2: source(false)
    };
  }
}
__name(push$1, "push$1");
function pop$1(component8) {
  const context_stack_item = component_context;
  if (context_stack_item !== null) {
    const component_effects = context_stack_item.e;
    if (component_effects !== null) {
      var previous_effect = active_effect;
      var previous_reaction = active_reaction;
      context_stack_item.e = null;
      try {
        for (var i = 0; i < component_effects.length; i++) {
          var component_effect = component_effects[i];
          set_active_effect(component_effect.effect);
          set_active_reaction(component_effect.reaction);
          effect(component_effect.fn);
        }
      } finally {
        set_active_effect(previous_effect);
        set_active_reaction(previous_reaction);
      }
    }
    component_context = context_stack_item.p;
    context_stack_item.m = true;
  }
  return (
    /** @type {T} */
    {}
  );
}
__name(pop$1, "pop$1");
function subscribe_to_store(store, run, invalidate) {
  if (store == null) {
    run(void 0);
    return noop;
  }
  const unsub = untrack(
    () => store.subscribe(
      run,
      // @ts-expect-error
      invalidate
    )
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
__name(subscribe_to_store, "subscribe_to_store");
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
__name(escape_html, "escape_html");
function getContext(key2) {
  const context_map = get_or_init_context_map();
  const result = (
    /** @type {T} */
    context_map.get(key2)
  );
  return result;
}
__name(getContext, "getContext");
function setContext(key2, context) {
  get_or_init_context_map().set(key2, context);
  return context;
}
__name(setContext, "setContext");
function get_or_init_context_map(name) {
  if (current_component === null) {
    lifecycle_outside_component();
  }
  return current_component.c ??= new Map(get_parent_context(current_component) || void 0);
}
__name(get_or_init_context_map, "get_or_init_context_map");
function push(fn) {
  current_component = { p: current_component, c: null, d: null };
}
__name(push, "push");
function pop() {
  var component8 = (
    /** @type {Component} */
    current_component
  );
  var ondestroy = component8.d;
  if (ondestroy) {
    on_destroy.push(...ondestroy);
  }
  current_component = component8.p;
}
__name(pop, "pop");
function get_parent_context(component_context2) {
  let parent = component_context2.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
__name(get_parent_context, "get_parent_context");
function render(component8, options2 = {}) {
  const payload = { out: "", css: /* @__PURE__ */ new Set(), head: { title: "", out: "" } };
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += BLOCK_OPEN;
  if (options2.context) {
    push();
    current_component.c = options2.context;
  }
  component8(payload, options2.props ?? {}, {}, {});
  if (options2.context) {
    pop();
  }
  payload.out += BLOCK_CLOSE;
  for (const cleanup of on_destroy)
    cleanup();
  on_destroy = prev_on_destroy;
  let head2 = payload.head.out + payload.head.title;
  for (const { hash: hash2, code } of payload.css) {
    head2 += `<style id="${hash2}">${code}</style>`;
  }
  return {
    head: head2,
    html: payload.out,
    body: payload.out
  };
}
__name(render, "render");
function head(payload, fn) {
  const head_payload = payload.head;
  head_payload.out += BLOCK_OPEN;
  fn(head_payload);
  head_payload.out += BLOCK_CLOSE;
}
__name(head, "head");
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class")
    return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
__name(attr, "attr");
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
__name(stringify, "stringify");
function store_get(store_values, store_name, store) {
  if (store_name in store_values && store_values[store_name][0] === store) {
    return store_values[store_name][2];
  }
  store_values[store_name]?.[1]();
  store_values[store_name] = [store, null, void 0];
  const unsub = subscribe_to_store(
    store,
    /** @param {any} v */
    (v) => store_values[store_name][2] = v
  );
  store_values[store_name][1] = unsub;
  return store_values[store_name][2];
}
__name(store_get, "store_get");
function unsubscribe_stores(store_values) {
  for (const store_name in store_values) {
    store_values[store_name][1]();
  }
}
__name(unsubscribe_stores, "unsubscribe_stores");
function bind_props(props_parent, props_now) {
  for (const key2 in props_now) {
    const initial_value = props_parent[key2];
    const value = props_now[key2];
    if (initial_value === void 0 && value !== void 0 && Object.getOwnPropertyDescriptor(props_parent, key2)?.set) {
      props_parent[key2] = value;
    }
  }
}
__name(bind_props, "bind_props");
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
__name(ensure_array_like, "ensure_array_like");
var is_array;
var array_from;
var define_property;
var get_descriptor;
var noop;
var DERIVED;
var EFFECT;
var RENDER_EFFECT;
var BLOCK_EFFECT;
var BRANCH_EFFECT;
var ROOT_EFFECT;
var UNOWNED;
var DISCONNECTED;
var CLEAN;
var DIRTY;
var MAYBE_DIRTY;
var INERT;
var DESTROYED;
var EFFECT_RAN;
var HEAD_EFFECT;
var EFFECT_HAS_DERIVED;
var HYDRATION_START;
var HYDRATION_END;
var HYDRATION_ERROR;
var $window;
var first_child_getter;
var next_sibling_getter;
var FLUSH_MICROTASK;
var FLUSH_SYNC;
var scheduler_mode;
var is_micro_task_queued;
var is_flushing_effect;
var queued_root_effects;
var flush_count;
var active_reaction;
var active_effect;
var derived_sources;
var new_deps;
var skipped_deps;
var untracked_writes;
var current_version;
var skip_reaction;
var component_context;
var STATUS_MASK;
var ATTR_REGEX;
var CONTENT_REGEX;
var current_component;
var BLOCK_OPEN;
var BLOCK_CLOSE;
var on_destroy;
var replacements;
var init_index3 = __esm({
  ".svelte-kit/output/server/chunks/index3.js"() {
    init_node();
    is_array = Array.isArray;
    array_from = Array.from;
    define_property = Object.defineProperty;
    get_descriptor = Object.getOwnPropertyDescriptor;
    noop = /* @__PURE__ */ __name(() => {
    }, "noop");
    DERIVED = 1 << 1;
    EFFECT = 1 << 2;
    RENDER_EFFECT = 1 << 3;
    BLOCK_EFFECT = 1 << 4;
    BRANCH_EFFECT = 1 << 5;
    ROOT_EFFECT = 1 << 6;
    UNOWNED = 1 << 7;
    DISCONNECTED = 1 << 8;
    CLEAN = 1 << 9;
    DIRTY = 1 << 10;
    MAYBE_DIRTY = 1 << 11;
    INERT = 1 << 12;
    DESTROYED = 1 << 13;
    EFFECT_RAN = 1 << 14;
    HEAD_EFFECT = 1 << 18;
    EFFECT_HAS_DERIVED = 1 << 19;
    HYDRATION_START = "[";
    HYDRATION_END = "]";
    HYDRATION_ERROR = {};
    FLUSH_MICROTASK = 0;
    FLUSH_SYNC = 1;
    scheduler_mode = FLUSH_MICROTASK;
    is_micro_task_queued = false;
    is_flushing_effect = false;
    queued_root_effects = [];
    flush_count = 0;
    active_reaction = null;
    active_effect = null;
    derived_sources = null;
    new_deps = null;
    skipped_deps = 0;
    untracked_writes = null;
    current_version = 0;
    skip_reaction = false;
    component_context = null;
    STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
    ATTR_REGEX = /[&"<]/g;
    CONTENT_REGEX = /[&<]/g;
    current_component = null;
    BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
    BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
    on_destroy = [];
    replacements = {
      translate: /* @__PURE__ */ new Map([
        [true, "yes"],
        [false, "no"]
      ])
    };
  }
});
var require_ttlcache = __commonJS({
  "node_modules/@isaacs/ttlcache/index.js"(exports, module) {
    var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
    var now2 = /* @__PURE__ */ __name(() => perf.now(), "now2");
    var isPosInt = /* @__PURE__ */ __name((n2) => n2 && n2 === Math.floor(n2) && n2 > 0 && isFinite(n2), "isPosInt");
    var isPosIntOrInf = /* @__PURE__ */ __name((n2) => n2 === Infinity || isPosInt(n2), "isPosIntOrInf");
    var TTLCache2 = /* @__PURE__ */ __name(class _TTLCache {
      constructor({
        max = Infinity,
        ttl,
        updateAgeOnGet = false,
        checkAgeOnGet = false,
        noUpdateTTL = false,
        dispose,
        noDisposeOnSet = false
      } = {}) {
        this.expirations = /* @__PURE__ */ Object.create(null);
        this.data = /* @__PURE__ */ new Map();
        this.expirationMap = /* @__PURE__ */ new Map();
        if (ttl !== void 0 && !isPosIntOrInf(ttl)) {
          throw new TypeError(
            "ttl must be positive integer or Infinity if set"
          );
        }
        if (!isPosIntOrInf(max)) {
          throw new TypeError("max must be positive integer or Infinity");
        }
        this.ttl = ttl;
        this.max = max;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.checkAgeOnGet = !!checkAgeOnGet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDisposeOnSet = !!noDisposeOnSet;
        if (dispose !== void 0) {
          if (typeof dispose !== "function") {
            throw new TypeError("dispose must be function if set");
          }
          this.dispose = dispose;
        }
        this.timer = void 0;
        this.timerExpiration = void 0;
      }
      setTimer(expiration, ttl) {
        if (this.timerExpiration < expiration) {
          return;
        }
        if (this.timer) {
          clearTimeout(this.timer);
        }
        const t2 = setTimeout(() => {
          this.timer = void 0;
          this.timerExpiration = void 0;
          this.purgeStale();
          for (const exp in this.expirations) {
            this.setTimer(exp, exp - now2());
            break;
          }
        }, ttl);
        if (t2.unref)
          t2.unref();
        this.timerExpiration = expiration;
        this.timer = t2;
      }
      // hang onto the timer so we can clearTimeout if all items
      // are deleted.  Deno doesn't have Timer.unref(), so it
      // hangs otherwise.
      cancelTimer() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timerExpiration = void 0;
          this.timer = void 0;
        }
      }
      /* istanbul ignore next */
      cancelTimers() {
        process.emitWarning(
          'TTLCache.cancelTimers has been renamed to TTLCache.cancelTimer (no "s"), and will be removed in the next major version update'
        );
        return this.cancelTimer();
      }
      clear() {
        const entries = this.dispose !== _TTLCache.prototype.dispose ? [...this] : [];
        this.data.clear();
        this.expirationMap.clear();
        this.cancelTimer();
        this.expirations = /* @__PURE__ */ Object.create(null);
        for (const [key2, val] of entries) {
          this.dispose(val, key2, "delete");
        }
      }
      setTTL(key2, ttl = this.ttl) {
        const current = this.expirationMap.get(key2);
        if (current !== void 0) {
          const exp = this.expirations[current];
          if (!exp || exp.length <= 1) {
            delete this.expirations[current];
          } else {
            this.expirations[current] = exp.filter((k) => k !== key2);
          }
        }
        if (ttl !== Infinity) {
          const expiration = Math.floor(now2() + ttl);
          this.expirationMap.set(key2, expiration);
          if (!this.expirations[expiration]) {
            this.expirations[expiration] = [];
            this.setTimer(expiration, ttl);
          }
          this.expirations[expiration].push(key2);
        } else {
          this.expirationMap.set(key2, Infinity);
        }
      }
      set(key2, val, {
        ttl = this.ttl,
        noUpdateTTL = this.noUpdateTTL,
        noDisposeOnSet = this.noDisposeOnSet
      } = {}) {
        if (!isPosIntOrInf(ttl)) {
          throw new TypeError("ttl must be positive integer or Infinity");
        }
        if (this.expirationMap.has(key2)) {
          if (!noUpdateTTL) {
            this.setTTL(key2, ttl);
          }
          const oldValue = this.data.get(key2);
          if (oldValue !== val) {
            this.data.set(key2, val);
            if (!noDisposeOnSet) {
              this.dispose(oldValue, key2, "set");
            }
          }
        } else {
          this.setTTL(key2, ttl);
          this.data.set(key2, val);
        }
        while (this.size > this.max) {
          this.purgeToCapacity();
        }
        return this;
      }
      has(key2) {
        return this.data.has(key2);
      }
      getRemainingTTL(key2) {
        const expiration = this.expirationMap.get(key2);
        return expiration === Infinity ? expiration : expiration !== void 0 ? Math.max(0, Math.ceil(expiration - now2())) : 0;
      }
      get(key2, {
        updateAgeOnGet = this.updateAgeOnGet,
        ttl = this.ttl,
        checkAgeOnGet = this.checkAgeOnGet
      } = {}) {
        const val = this.data.get(key2);
        if (checkAgeOnGet && this.getRemainingTTL(key2) === 0) {
          this.delete(key2);
          return void 0;
        }
        if (updateAgeOnGet) {
          this.setTTL(key2, ttl);
        }
        return val;
      }
      dispose(_, __) {
      }
      delete(key2) {
        const current = this.expirationMap.get(key2);
        if (current !== void 0) {
          const value = this.data.get(key2);
          this.data.delete(key2);
          this.expirationMap.delete(key2);
          const exp = this.expirations[current];
          if (exp) {
            if (exp.length <= 1) {
              delete this.expirations[current];
            } else {
              this.expirations[current] = exp.filter((k) => k !== key2);
            }
          }
          this.dispose(value, key2, "delete");
          if (this.size === 0) {
            this.cancelTimer();
          }
          return true;
        }
        return false;
      }
      purgeToCapacity() {
        for (const exp in this.expirations) {
          const keys = this.expirations[exp];
          if (this.size - keys.length >= this.max) {
            delete this.expirations[exp];
            const entries = [];
            for (const key2 of keys) {
              entries.push([key2, this.data.get(key2)]);
              this.data.delete(key2);
              this.expirationMap.delete(key2);
            }
            for (const [key2, val] of entries) {
              this.dispose(val, key2, "evict");
            }
          } else {
            const s3 = this.size - this.max;
            const entries = [];
            for (const key2 of keys.splice(0, s3)) {
              entries.push([key2, this.data.get(key2)]);
              this.data.delete(key2);
              this.expirationMap.delete(key2);
            }
            for (const [key2, val] of entries) {
              this.dispose(val, key2, "evict");
            }
            return;
          }
        }
      }
      get size() {
        return this.data.size;
      }
      purgeStale() {
        const n2 = Math.ceil(now2());
        for (const exp in this.expirations) {
          if (exp === "Infinity" || exp > n2) {
            return;
          }
          const keys = [...this.expirations[exp] || []];
          const entries = [];
          delete this.expirations[exp];
          for (const key2 of keys) {
            entries.push([key2, this.data.get(key2)]);
            this.data.delete(key2);
            this.expirationMap.delete(key2);
          }
          for (const [key2, val] of entries) {
            this.dispose(val, key2, "stale");
          }
        }
        if (this.size === 0) {
          this.cancelTimer();
        }
      }
      *entries() {
        for (const exp in this.expirations) {
          for (const key2 of this.expirations[exp]) {
            yield [key2, this.data.get(key2)];
          }
        }
      }
      *keys() {
        for (const exp in this.expirations) {
          for (const key2 of this.expirations[exp]) {
            yield key2;
          }
        }
      }
      *values() {
        for (const exp in this.expirations) {
          for (const key2 of this.expirations[exp]) {
            yield this.data.get(key2);
          }
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
    }, "_TTLCache");
    module.exports = TTLCache2;
  }
});
var ONE_DAY_IN_SECONDS;
var KvStore;
var init_dist = __esm({
  "node_modules/svelte-kit-connect-cloudflare-kv/dist/index.js"() {
    ONE_DAY_IN_SECONDS = 86400;
    KvStore = /* @__PURE__ */ __name(class {
      constructor(options2) {
        if (options2.ttl && options2.ttl < 60 * 1e3)
          throw new Error("ttl must be at least 60 * 1000. please refer to https://developers.cloudflare.com/workers/runtime-apis/kv#expiration-ttlhttps://developers.cloudflare.com/api/operations/workers-kv-namespace-write-multiple-key-value-pairs#request-body.");
        this.client = options2.client;
        this.prefix = options2.prefix || "sess:";
        this.serializer = options2.serializer || JSON;
        this.ttl = options2.ttl || ONE_DAY_IN_SECONDS * 1e3;
      }
      /**
       * An KVNamespace.
       */
      client;
      /**
       * The prefix of the key in redis.
       * @default 'sess:'
       */
      prefix;
      /**
       * The serializer to use.
       * @default JSON
       */
      serializer;
      /**
       * Time to live in milliseconds.
       * default: 86400 * 1000
       */
      ttl;
      async get(id) {
        const key2 = this.prefix + id;
        const storeData = await this.client.get(key2, { type: "text" });
        return storeData ? this.serializer.parse(storeData) : null;
      }
      async set(id, storeData, ttl) {
        if (ttl < 60 * 1e3)
          throw new Error("ttl must be at least 60 * 1000. please refer to https://developers.cloudflare.com/workers/runtime-apis/kv#expiration-ttlhttps://developers.cloudflare.com/api/operations/workers-kv-namespace-write-multiple-key-value-pairs#request-body.");
        const key2 = this.prefix + id;
        const serialized = this.serializer.stringify(storeData);
        if (ttl !== Infinity) {
          await this.client.put(key2, serialized, { expirationTtl: ttl / 1e3 });
          return;
        }
        await this.client.put(key2, serialized, { expirationTtl: this.ttl / 1e3 });
      }
      async destroy(id) {
        const key2 = this.prefix + id;
        await this.client.delete(key2);
      }
      async touch(id, ttl) {
        if (ttl < 60 * 1e3)
          throw new Error("ttl must be at least 60 * 1000. please refer to https://developers.cloudflare.com/workers/runtime-apis/kv#expiration-ttlhttps://developers.cloudflare.com/api/operations/workers-kv-namespace-write-multiple-key-value-pairs#request-body.");
        const storeData = await this.get(id);
        if (storeData) {
          const key2 = this.prefix + id;
          const serialized = this.serializer.stringify(storeData);
          await this.client.put(key2, serialized, { expirationTtl: ttl / 1e3 });
        }
      }
    }, "KvStore");
  }
});
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
function str2ab(str) {
  const buffer = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i += 1) {
    buffer[i] = str.charCodeAt(i);
  }
  return buffer;
}
__name(str2ab, "str2ab");
async function sign(val, secret) {
  const keyData = str2ab(typeof secret === "string" ? secret : secret[0]);
  const key2 = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key2, str2ab(val));
  return `${val}.${btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(signature)))).replace(/=+$/, "")}`;
}
__name(sign, "sign");
async function unsign(input, secret) {
  const tentativeValue = input.slice(0, input.lastIndexOf("."));
  if (typeof secret === "string") {
    const expectedSignature = await sign(tentativeValue, secret);
    return expectedSignature === input ? tentativeValue : null;
  }
  const results = await Promise.all(secret.map(async (v) => {
    const expectedSignature = await sign(tentativeValue, v);
    return expectedSignature === input ? tentativeValue : null;
  }));
  return results.find((v) => v !== null) || null;
}
__name(unsign, "unsign");
var import_ttlcache;
var randomBytes;
var EQUAL_END_REGEXP;
var PLUS_GLOBAL_REGEXP;
var SLASH_GLOBAL_REGEXP;
var toString;
var uidSync;
var generateSessionId;
var defaultCookieOptions;
var getTtlMs;
var parseSessionCookieOptions;
var Session;
var ONE_DAY_IN_SECONDS2;
var MemoryStore;
var memoryStore;
var sveltekitSessionHandle;
var handle;
var init_hooks_server = __esm({
  ".svelte-kit/output/server/chunks/hooks.server.js"() {
    import_ttlcache = __toESM(require_ttlcache(), 1);
    init_dist();
    randomBytes = /* @__PURE__ */ __name((size) => {
      return crypto.getRandomValues(new Uint8Array(size));
    }, "randomBytes");
    EQUAL_END_REGEXP = /=+$/;
    PLUS_GLOBAL_REGEXP = /\+/g;
    SLASH_GLOBAL_REGEXP = /\//g;
    toString = /* @__PURE__ */ __name((buf) => {
      const base642 = btoa(String.fromCharCode.apply(null, buf));
      return base642.replace(EQUAL_END_REGEXP, "").replace(PLUS_GLOBAL_REGEXP, "-").replace(SLASH_GLOBAL_REGEXP, "_");
    }, "toString");
    uidSync = /* @__PURE__ */ __name((length) => toString(randomBytes(length)), "uidSync");
    generateSessionId = /* @__PURE__ */ __name(() => uidSync(24), "generateSessionId");
    defaultCookieOptions = /* @__PURE__ */ __name(() => ({
      // https://github.com/expressjs/session/blob/v1.17.3/session/cookie.js#L26
      path: "/"
    }), "defaultCookieOptions");
    getTtlMs = /* @__PURE__ */ __name((cookie) => {
      const { expires, maxAge } = cookie;
      if (maxAge)
        return maxAge * 1e3;
      if (expires) {
        const ms = new Date(expires).getTime() - Date.now();
        return Math.ceil(ms / 1e3) * 1e3;
      }
      return Infinity;
    }, "getTtlMs");
    parseSessionCookieOptions = /* @__PURE__ */ __name((options2, cookieOptions) => {
      const cookie = { ...cookieOptions };
      if (options2.cookie && options2.cookie.encode)
        cookie.encode = (value) => options2.cookie.encode(value);
      if (cookie.expires)
        cookie.expires = new Date(cookie.expires);
      return cookie;
    }, "parseSessionCookieOptions");
    Session = /* @__PURE__ */ __name(class _Session {
      constructor(event, options2) {
        this.#id = generateSessionId();
        this.#cookieName = options2.name || "connect.sid";
        this.#cookie = { ...defaultCookieOptions(), ...options2.cookie };
        this.#sessionOptions = options2;
        this.#event = event;
        this.#storeTtlMs = getTtlMs(options2.cookie || {});
      }
      static async initialize(event, options2) {
        const session = new _Session(event, options2);
        const { cookies } = session.#event;
        const { secret, store, rolling, saveUninitialized } = session.#sessionOptions;
        const sid = cookies.get(session.#cookieName);
        const unsignedSid = await unsign(sid || "", secret);
        if (unsignedSid) {
          const sessionData = await store.get(unsignedSid);
          if (sessionData) {
            session.#id = unsignedSid;
            session.#cookie = parseSessionCookieOptions(options2, sessionData.cookie);
            session.#data = sessionData.data;
            session.#storeTtlMs = getTtlMs(sessionData.cookie);
            if (session.#cookie.maxAge && rolling) {
              await store.touch(session.#id, session.#cookie.maxAge * 1e3);
              cookies.set(session.#cookieName, await sign(session.#id, secret), session.#cookie);
            }
            return session;
          }
        }
        if (saveUninitialized) {
          await store.set(session.#id, { cookie: session.#getParsableCookieOptions(), data: session.#data }, session.#storeTtlMs);
          cookies.set(session.#cookieName, await sign(session.#id, secret), session.#cookie);
        }
        return session;
      }
      #id;
      #cookieName;
      #cookie;
      #data = {};
      #sessionOptions;
      #event;
      /**
       * ttl time(milliseconds) for session store.
       */
      #storeTtlMs;
      /**
       * Session ID.
       */
      get id() {
        return this.#id;
      }
      /**
       * Session cookie name.
       */
      get cookieName() {
        return this.#cookieName;
      }
      /**
       * Session cookie options.
       */
      get cookie() {
        return this.#cookie;
      }
      /**
       * Session data.
       */
      get data() {
        return this.#data;
      }
      /**
       * Session store instance.
       */
      get store() {
        return this.#sessionOptions.store;
      }
      #getParsableCookieOptions() {
        const cookie = { ...this.#cookie };
        if (cookie.encode)
          delete cookie.encode;
        return cookie;
      }
      /**
       * Set data in the session.
       *
       * If `saveUninitialized` is `true`, the session is saved without calling `save()`.
       * Conversely, if `saveUninitialized` is `false`, call `save()` to explicitly save the session.
       */
      async setData(data) {
        this.#data = data;
        if (this.#sessionOptions.saveUninitialized)
          await this.store.set(this.id, { cookie: this.#getParsableCookieOptions(), data: this.#data }, this.#storeTtlMs);
      }
      /**
       * Save the session (save session to store) and set cookie.
       */
      async save() {
        await this.#sessionOptions.store.set(this.id, { cookie: this.#getParsableCookieOptions(), data: this.#data }, this.#storeTtlMs);
        this.#event.cookies.set(this.#cookieName, await sign(this.#id, this.#sessionOptions.secret), this.#cookie);
      }
      /**
       * Regenerate the session simply invoke the method.
       * Once complete, a new Session and `Session` instance will be initialized.
       */
      async regenerate() {
        await this.destroy();
        const session = new _Session(this.#event, this.#sessionOptions);
        return session;
      }
      /**
       * Destroy the session.
       */
      async destroy() {
        await this.#sessionOptions.store.destroy(this.#id);
        this.#event.cookies.delete(this.#cookieName, { ...this.#cookie });
      }
    }, "_Session");
    ONE_DAY_IN_SECONDS2 = 86400;
    MemoryStore = /* @__PURE__ */ __name(class {
      #sessions = new import_ttlcache.default();
      #prefix;
      #serializer;
      /**
       * Time to live in milliseconds.
       * default: 86400 * 1000
       */
      #ttl;
      constructor(options2) {
        this.#prefix = options2?.prefix || "";
        this.#serializer = options2?.serializer || JSON;
        this.#ttl = options2?.ttl || ONE_DAY_IN_SECONDS2 * 1e3;
      }
      async get(id) {
        const key2 = this.#prefix + id;
        const storeData = this.#sessions.get(key2);
        return storeData ? this.#serializer.parse(storeData) : null;
      }
      async set(id, storeData, ttl) {
        const key2 = this.#prefix + id;
        const serialized = this.#serializer.stringify(storeData);
        if (ttl !== Infinity) {
          this.#sessions.set(key2, serialized, { ttl });
          return;
        }
        this.#sessions.set(key2, serialized, { ttl: this.#ttl });
      }
      async destroy(id) {
        const key2 = this.#prefix + id;
        this.#sessions.delete(key2);
      }
      async touch(id, ttl) {
        const key2 = this.#prefix + id;
        this.#sessions.setTTL(key2, ttl);
      }
    }, "MemoryStore");
    memoryStore = new MemoryStore();
    sveltekitSessionHandle = /* @__PURE__ */ __name((options2) => (
      // eslint-disable-next-line @typescript-eslint/unbound-method
      async ({ event, resolve: resolve2 }) => {
        const { locals } = event;
        locals.session = await Session.initialize({ cookies: event.cookies }, { store: memoryStore, ...options2 });
        const response = await resolve2(event);
        return response;
      }
    ), "sveltekitSessionHandle");
    handle = /* @__PURE__ */ __name(async ({ event, resolve: resolve2 }) => {
      let sessionHandle = null;
      if (event.platform && event.platform.env) {
        const store = new KvStore({ client: event.platform.env.KV });
        sessionHandle = sveltekitSessionHandle({
          secret: "secret",
          store
        });
      }
      return sessionHandle ? sessionHandle({ event, resolve: resolve2 }) : resolve2(event);
    }, "handle");
  }
});
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
__name(json, "json");
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
__name(text, "text");
function fail(status, data) {
  return new ActionFailure(status, data);
}
__name(fail, "fail");
var HttpError;
var Redirect;
var SvelteKitError;
var ActionFailure;
var encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = /* @__PURE__ */ __name(class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body2) {
        this.status = status;
        if (typeof body2 === "string") {
          this.body = { message: body2 };
        } else if (body2) {
          this.body = body2;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    }, "HttpError");
    Redirect = /* @__PURE__ */ __name(class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    }, "Redirect");
    SvelteKitError = /* @__PURE__ */ __name(class extends Error {
      /**
       * @param {number} status
       * @param {string} text
       * @param {string} message
       */
      constructor(status, text2, message) {
        super(message);
        this.status = status;
        this.text = text2;
      }
    }, "SvelteKitError");
    ActionFailure = /* @__PURE__ */ __name(class {
      /**
       * @param {number} status
       * @param {T} data
       */
      constructor(status, data) {
        this.status = status;
        this.data = data;
      }
    }, "ActionFailure");
    encoder = new TextEncoder();
  }
});
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/")
    return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
__name(resolve, "resolve");
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
__name(normalize_path, "normalize_path");
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
__name(decode_pathname, "decode_pathname");
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
__name(decode_params, "decode_params");
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
    tracked.searchParams[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url.searchParams, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
__name(make_trackable, "make_trackable");
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
__name(disable_hash, "disable_hash");
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
__name(disable_search, "disable_search");
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
__name(allow_nodejs_console_log, "allow_nodejs_console_log");
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
__name(has_data_suffix, "has_data_suffix");
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html"))
    return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
__name(add_data_suffix, "add_data_suffix");
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
__name(strip_data_suffix, "strip_data_suffix");
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  __name(validate, "validate");
  return validate;
}
__name(validator, "validator");
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
__name(hint_for_supported_files, "hint_for_supported_files");
var internal;
var tracked_url_properties;
var DATA_SUFFIX;
var HTML_DATA_SUFFIX;
var valid_layout_exports;
var valid_page_exports;
var valid_layout_server_exports;
var valid_page_server_exports;
var valid_server_exports;
var validate_layout_exports;
var validate_page_exports;
var validate_layout_server_exports;
var validate_page_server_exports;
var validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    tracked_url_properties = /** @type {const} */
    [
      "href",
      "pathname",
      "search",
      "toString",
      "toJSON"
    ];
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
__name(readable, "readable");
function writable(value, start = noop) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  __name(set2, "set2");
  function update(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  __name(update, "update");
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop;
    }
    run(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  __name(subscribe, "subscribe");
  return { set: set2, update, subscribe };
}
__name(writable, "writable");
var subscriber_queue;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_index3();
    subscriber_queue = [];
  }
});
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse2;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse2(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index8 = 0;
      while (index8 < str.length) {
        var eqIdx = str.indexOf("=", index8);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index8);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index8 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index8, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index8 = endIdx + 1;
      }
      return obj;
    }
    __name(parse2, "parse2");
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    __name(serialize2, "serialize2");
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    __name(decode, "decode");
    function encode2(val) {
      return encodeURIComponent(val);
    }
    __name(encode2, "encode2");
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    __name(isDate, "isDate");
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e3) {
        return str;
      }
    }
    __name(tryDecode, "tryDecode");
  }
});
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    __name(isNonEmptyString, "isNonEmptyString");
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e3) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e3
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else if (key2 === "partitioned") {
          cookie.partitioned = true;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    __name(parseString2, "parseString2");
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    __name(parseNameValuePair, "parseNameValuePair");
    function parse2(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    __name(parse2, "parse2");
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      __name(skipWhitespace, "skipWhitespace");
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      __name(notSpecialChar, "notSpecialChar");
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    __name(splitCookiesString2, "splitCookiesString2");
    module.exports = parse2;
    module.exports.parse = parse2;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});
var layout_ts_exports = {};
__export(layout_ts_exports, {
  prerender: () => prerender
});
var prerender;
var init_layout_ts = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.ts.js"() {
    prerender = false;
  }
});
function get2(key2, parse2 = JSON.parse) {
  try {
    return parse2(sessionStorage[key2]);
  } catch {
  }
}
__name(get2, "get2");
var SNAPSHOT_KEY;
var SCROLL_KEY;
var init_client = __esm({
  ".svelte-kit/output/server/chunks/client.js"() {
    init_exports();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get2(SCROLL_KEY) ?? {};
    get2(SNAPSHOT_KEY) ?? {};
  }
});
var getStores;
var page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_index3();
    init_client();
    getStores = /* @__PURE__ */ __name(() => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    }, "getStores");
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
function Header($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<header class="svelte-1u9z1tp"><div class="corner svelte-1u9z1tp"><a href="https://svelte.dev/docs/kit" class="svelte-1u9z1tp"><img${attr("src", logo)} alt="SvelteKit" class="svelte-1u9z1tp"></a></div> <nav class="svelte-1u9z1tp"><svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-1u9z1tp"><path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" class="svelte-1u9z1tp"></path></svg> <ul class="svelte-1u9z1tp"><li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" ? "page" : void 0)} class="svelte-1u9z1tp"><a href="/" class="svelte-1u9z1tp">Home</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === "/about" ? "page" : void 0)} class="svelte-1u9z1tp"><a href="/about" class="svelte-1u9z1tp">About</a></li> <li${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/sverdle") ? "page" : void 0)} class="svelte-1u9z1tp"><a href="/sverdle" class="svelte-1u9z1tp">Sverdle</a></li></ul> <svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-1u9z1tp"><path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" class="svelte-1u9z1tp"></path></svg></nav> <div class="corner svelte-1u9z1tp"><a href="https://github.com/sveltejs/kit" class="svelte-1u9z1tp"><img${attr("src", github)} alt="GitHub" class="svelte-1u9z1tp"></a></div></header>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
__name(Header, "Header");
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="app svelte-8o1gnw">`;
  Header($$payload);
  $$payload.out += `<!----> <main class="svelte-8o1gnw">`;
  children($$payload);
  $$payload.out += `<!----></main> <footer class="svelte-8o1gnw"><p>visit <a href="https://svelte.dev/docs/kit" class="svelte-8o1gnw">svelte.dev/docs/kit</a> to learn about SvelteKit</p></footer></div>`;
  pop();
}
__name(_layout, "_layout");
var logo;
var github;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_index3();
    init_stores();
    logo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.1566,22.8189c-10.4-14.8851-30.94-19.2971-45.7914-9.8348L22.2825,29.6078A29.9234,29.9234,0,0,0,8.7639,49.6506a31.5136,31.5136,0,0,0,3.1076,20.2318A30.0061,30.0061,0,0,0,7.3953,81.0653a31.8886,31.8886,0,0,0,5.4473,24.1157c10.4022,14.8865,30.9423,19.2966,45.7914,9.8348L84.7167,98.3921A29.9177,29.9177,0,0,0,98.2353,78.3493,31.5263,31.5263,0,0,0,95.13,58.117a30,30,0,0,0,4.4743-11.1824,31.88,31.88,0,0,0-5.4473-24.1157'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.8171,106.5815A20.7182,20.7182,0,0,1,23.58,98.3389a19.1739,19.1739,0,0,1-3.2766-14.5025,18.1886,18.1886,0,0,1,.6233-2.4357l.4912-1.4978,1.3363.9815a33.6443,33.6443,0,0,0,10.203,5.0978l.9694.2941-.0893.9675a5.8474,5.8474,0,0,0,1.052,3.8781,6.2389,6.2389,0,0,0,6.6952,2.485,5.7449,5.7449,0,0,0,1.6021-.7041L69.27,76.281a5.4306,5.4306,0,0,0,2.4506-3.631,5.7948,5.7948,0,0,0-.9875-4.3712,6.2436,6.2436,0,0,0-6.6978-2.4864,5.7427,5.7427,0,0,0-1.6.7036l-9.9532,6.3449a19.0329,19.0329,0,0,1-5.2965,2.3259,20.7181,20.7181,0,0,1-22.2368-8.2427,19.1725,19.1725,0,0,1-3.2766-14.5024,17.9885,17.9885,0,0,1,8.13-12.0513L55.8833,23.7472a19.0038,19.0038,0,0,1,5.3-2.3287A20.7182,20.7182,0,0,1,83.42,29.6611a19.1739,19.1739,0,0,1,3.2766,14.5025,18.4,18.4,0,0,1-.6233,2.4357l-.4912,1.4978-1.3356-.98a33.6175,33.6175,0,0,0-10.2037-5.1l-.9694-.2942.0893-.9675a5.8588,5.8588,0,0,0-1.052-3.878,6.2389,6.2389,0,0,0-6.6952-2.485,5.7449,5.7449,0,0,0-1.6021.7041L37.73,51.719a5.4218,5.4218,0,0,0-2.4487,3.63,5.7862,5.7862,0,0,0,.9856,4.3717,6.2437,6.2437,0,0,0,6.6978,2.4864,5.7652,5.7652,0,0,0,1.602-.7041l9.9519-6.3425a18.978,18.978,0,0,1,5.2959-2.3278,20.7181,20.7181,0,0,1,22.2368,8.2427,19.1725,19.1725,0,0,1,3.2766,14.5024,17.9977,17.9977,0,0,1-8.13,12.0532L51.1167,104.2528a19.0038,19.0038,0,0,1-5.3,2.3287'%20style='fill:%23fff'/%3e%3c/svg%3e";
    github = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='-3%20-3%2030%2030'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%202C6.47715%202%202%206.47715%202%2012C2%2017.5229%206.47715%2022%2012%2022C17.5229%2022%2022%2017.5229%2022%2012C22%206.47715%2017.5229%202%2012%202ZM0%2012C0%205.3726%205.3726%200%2012%200C18.6274%200%2024%205.3726%2024%2012C24%2018.6274%2018.6274%2024%2012%2024C5.3726%2024%200%2018.6274%200%2012Z'%20fill='rgba(0,0,0,0.7)'%20stroke='none'%20/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.59162%2022.7357C9.49492%2022.6109%209.49492%2021.4986%209.59162%2019.399C8.55572%2019.4347%207.90122%2019.3628%207.62812%2019.1833C7.21852%2018.9139%206.80842%2018.0833%206.44457%2017.4979C6.08072%2016.9125%205.27312%2016.8199%204.94702%2016.6891C4.62091%2016.5582%204.53905%2016.0247%205.84562%2016.4282C7.15222%2016.8316%207.21592%2017.9303%207.62812%2018.1872C8.04032%2018.4441%209.02572%2018.3317%209.47242%2018.1259C9.91907%2017.9201%209.88622%2017.1538%209.96587%2016.8503C10.0666%2016.5669%209.71162%2016.5041%209.70382%2016.5018C9.26777%2016.5018%206.97697%2016.0036%206.34772%2013.7852C5.71852%2011.5669%206.52907%2010.117%206.96147%209.49369C7.24972%209.07814%207.22422%208.19254%206.88497%206.83679C8.11677%206.67939%209.06732%207.06709%209.73672%207.99999C9.73737%208.00534%2010.6143%207.47854%2012.0001%207.47854C13.386%207.47854%2013.8777%207.90764%2014.2571%207.99999C14.6365%208.09234%2014.94%206.36699%2017.2834%206.83679C16.7942%207.79839%2016.3844%208.99999%2016.6972%209.49369C17.0099%209.98739%2018.2372%2011.5573%2017.4833%2013.7852C16.9807%2015.2706%2015.9927%2016.1761%2014.5192%2016.5018C14.3502%2016.5557%2014.2658%2016.6427%2014.2658%2016.7627C14.2658%2016.9427%2014.4942%2016.9624%2014.8233%2017.8058C15.0426%2018.368%2015.0585%2019.9739%2014.8708%2022.6234C14.3953%2022.7445%2014.0254%2022.8257%2013.7611%2022.8673C13.2924%2022.9409%2012.7835%2022.9822%2012.2834%2022.9982C11.7834%2023.0141%2011.6098%2023.0123%2010.9185%2022.948C10.4577%2022.9051%2010.0154%2022.8343%209.59162%2022.7357Z'%20fill='rgba(0,0,0,0.7)'%20stroke='none'%20/%3e%3c/svg%3e";
  }
});
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets,
  universal: () => layout_ts_exports,
  universal_id: () => universal_id
});
var index;
var component_cache;
var component;
var universal_id;
var imports;
var stylesheets;
var fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_ts();
    index = 0;
    component = /* @__PURE__ */ __name(async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default, "component");
    universal_id = "src/routes/+layout.ts";
    imports = ["_app/immutable/nodes/0.B4-8tOmL.js", "_app/immutable/chunks/disclose-version._bx3ty70.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/attributes.CwDe2KbA.js", "_app/immutable/chunks/stores.4dd07FBn.js", "_app/immutable/chunks/entry.k1rp80hB.js", "_app/immutable/chunks/index.CkknOhtp.js", "_app/immutable/chunks/store.CC9CMBvc.js"];
    stylesheets = ["_app/immutable/assets/0.MkCFnZkZ.css"];
    fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.B04YIrm4.woff2", "_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.0xXfcOOq.woff", "_app/immutable/assets/fira-mono-cyrillic-400-normal.36-45Uyg.woff2", "_app/immutable/assets/fira-mono-cyrillic-400-normal.Dq7SlH2J.woff", "_app/immutable/assets/fira-mono-greek-ext-400-normal.CsqI23CO.woff2", "_app/immutable/assets/fira-mono-greek-ext-400-normal.BEhC8Nsh.woff", "_app/immutable/assets/fira-mono-greek-400-normal.C3zng6O6.woff2", "_app/immutable/assets/fira-mono-greek-400-normal.DUeQbRz0.woff", "_app/immutable/assets/fira-mono-latin-ext-400-normal.D6XfiR-_.woff2", "_app/immutable/assets/fira-mono-latin-ext-400-normal.lWlD_NAB.woff", "_app/immutable/assets/fira-mono-latin-400-normal.DKjLVgQi.woff2", "_app/immutable/assets/fira-mono-latin-400-normal.g4W12wf9.woff"];
  }
});
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
function Error2($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<h1>${escape_html(store_get($$store_subs ??= {}, "$page", page).status)}</h1> <p>${escape_html(store_get($$store_subs ??= {}, "$page", page).error?.message)}</p>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
__name(Error2, "Error2");
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index3();
    init_stores();
  }
});
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2;
var component_cache2;
var component2;
var imports2;
var stylesheets2;
var fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = /* @__PURE__ */ __name(async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default, "component2");
    imports2 = ["_app/immutable/nodes/1.C_CZGu-t.js", "_app/immutable/chunks/disclose-version._bx3ty70.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/render.D7WQuqm4.js", "_app/immutable/chunks/svelte-head.CnFvDmQ8.js", "_app/immutable/chunks/stores.4dd07FBn.js", "_app/immutable/chunks/entry.k1rp80hB.js", "_app/immutable/chunks/index.CkknOhtp.js", "_app/immutable/chunks/store.CC9CMBvc.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => _page
});
function loop(callback) {
  let task;
  if (raf.tasks.size === 0)
    ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
__name(loop, "loop");
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
__name(is_date, "is_date");
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => (
        // @ts-ignore
        tick_spring(ctx, last_value[i], current_value[i], target_value[i])
      )
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
__name(tick_spring, "tick_spring");
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = (
    /** @type {T} */
    value
  );
  let target_value = (
    /** @type {T | undefined} */
    value
  );
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set2(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = raf.now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = raf.now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = /** @type {T} */
        value;
        store.set(value = /** @type {T} */
        next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  __name(set2, "set2");
  const spring2 = {
    set: set2,
    update: (fn, opts2) => set2(fn(
      /** @type {T} */
      target_value,
      /** @type {T} */
      value
    ), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
__name(spring, "spring");
function Counter($$payload, $$props) {
  push();
  var $$store_subs;
  let count = 0;
  const displayedCount = spring(count);
  let offset = modulo(store_get($$store_subs ??= {}, "$displayedCount", displayedCount), 1);
  function modulo(n2, m) {
    return (n2 % m + m) % m;
  }
  __name(modulo, "modulo");
  $$payload.out += `<div class="counter svelte-y96mxt"><button aria-label="Decrease the counter by one" class="svelte-y96mxt"><svg aria-hidden="true" viewBox="0 0 1 1" class="svelte-y96mxt"><path d="M0,0.5 L1,0.5" class="svelte-y96mxt"></path></svg></button> <div class="counter-viewport svelte-y96mxt"><div class="counter-digits svelte-y96mxt"${attr("style", `transform: translate(0, ${stringify(100 * offset)}%)`)}><strong class="hidden svelte-y96mxt" aria-hidden="true">${escape_html(Math.floor(store_get($$store_subs ??= {}, "$displayedCount", displayedCount) + 1))}</strong> <strong class="svelte-y96mxt">${escape_html(Math.floor(store_get($$store_subs ??= {}, "$displayedCount", displayedCount)))}</strong></div></div> <button aria-label="Increase the counter by one" class="svelte-y96mxt"><svg aria-hidden="true" viewBox="0 0 1 1" class="svelte-y96mxt"><path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" class="svelte-y96mxt"></path></svg></button></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
__name(Counter, "Counter");
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Home</title>`;
    $$payload2.out += `<meta name="description" content="Svelte demo app">`;
  });
  $$payload.out += `<section class="svelte-19xx0bt"><h1 class="svelte-19xx0bt"><span class="welcome svelte-19xx0bt"><picture><source${attr("srcset", welcome)} type="image/webp"> <img${attr("src", welcomeFallback)} alt="Welcome" class="svelte-19xx0bt"></picture></span> to your new<br>SvelteKit app</h1> <h2>try editing <strong>src/routes/+page.svelte</strong></h2> `;
  Counter($$payload);
  $$payload.out += `<!----></section>`;
}
__name(_page, "_page");
var now;
var raf;
var welcome;
var welcomeFallback;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_index3();
    init_index2();
    now = /* @__PURE__ */ __name(() => Date.now(), "now");
    raf = {
      // don't access requestAnimationFrame eagerly outside method
      // this allows basic testing of user code without JSDOM
      // bunder will eval and remove ternary when the user's app is built
      tick: (
        /** @param {any} _ */
        (_) => noop()
      ),
      now: () => now(),
      tasks: /* @__PURE__ */ new Set()
    };
    welcome = "/_app/immutable/assets/svelte-welcome.0pIiHnVF.webp";
    welcomeFallback = "/_app/immutable/assets/svelte-welcome.VNiyy3gC.png";
  }
});
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3;
var component_cache3;
var component3;
var imports3;
var stylesheets3;
var fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = /* @__PURE__ */ __name(async () => component_cache3 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default, "component3");
    imports3 = ["_app/immutable/nodes/2.C3kbVLQf.js", "_app/immutable/chunks/disclose-version._bx3ty70.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/svelte-head.CnFvDmQ8.js", "_app/immutable/chunks/attributes.CwDe2KbA.js", "_app/immutable/chunks/render.D7WQuqm4.js", "_app/immutable/chunks/store.CC9CMBvc.js", "_app/immutable/chunks/index.CkknOhtp.js"];
    stylesheets3 = ["_app/immutable/assets/2.sTI-GHXi.css"];
    fonts3 = [];
  }
});
var dev;
var init_index4 = __esm({
  ".svelte-kit/output/server/chunks/index4.js"() {
    init_node();
    dev = DEV;
  }
});
var page_ts_exports = {};
__export(page_ts_exports, {
  csr: () => csr
});
var csr;
var init_page_ts = __esm({
  ".svelte-kit/output/server/entries/pages/about/_page.ts.js"() {
    init_index4();
    csr = dev;
  }
});
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => _page2
});
function _page2($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>About</title>`;
    $$payload2.out += `<meta name="description" content="About this app">`;
  });
  $$payload.out += `<div class="text-column"><h1>About this app</h1> <p>This is a <a href="https://svelte.dev/docs/kit">SvelteKit</a> app. You can make your own by typing
		the following into your command line and following the prompts:</p> <pre>npx sv create</pre> <p>The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.</p> <p>The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling. Try
		using it with JavaScript disabled!</p></div>`;
}
__name(_page2, "_page2");
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/about/_page.svelte.js"() {
    init_index3();
  }
});
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4,
  universal: () => page_ts_exports,
  universal_id: () => universal_id2
});
var index4;
var component_cache4;
var component4;
var universal_id2;
var imports4;
var stylesheets4;
var fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_page_ts();
    index4 = 3;
    component4 = /* @__PURE__ */ __name(async () => component_cache4 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default, "component4");
    universal_id2 = "src/routes/about/+page.ts";
    imports4 = ["_app/immutable/nodes/3.V7SrXV_D.js", "_app/immutable/chunks/index.DmefBFGc.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/disclose-version._bx3ty70.js", "_app/immutable/chunks/svelte-head.CnFvDmQ8.js"];
    stylesheets4 = [];
    fonts4 = [];
  }
});
function setErrorMap(map) {
  overrideErrorMap = map;
}
__name(setErrorMap, "setErrorMap");
function getErrorMap() {
  return overrideErrorMap;
}
__name(getErrorMap, "getErrorMap");
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
__name(addIssueToContext, "addIssueToContext");
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
__name(__classPrivateFieldGet, "__classPrivateFieldGet");
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
__name(__classPrivateFieldSet, "__classPrivateFieldSet");
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = /* @__PURE__ */ __name((iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
  }, "customMap");
  return { errorMap: customMap, description };
}
__name(processCreateParams, "processCreateParams");
function timeRegexSource(args) {
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args.precision) {
    regex = `${regex}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    regex = `${regex}(\\.\\d+)?`;
  }
  return regex;
}
__name(timeRegexSource, "timeRegexSource");
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
__name(timeRegex, "timeRegex");
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
__name(datetimeRegex, "datetimeRegex");
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
__name(isValidIP, "isValidIP");
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
__name(floatSafeRemainder, "floatSafeRemainder");
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key2 in schema.shape) {
      const fieldSchema = schema.shape[key2];
      newShape[key2] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
__name(deepPartialify, "deepPartialify");
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key2) => bKeys.indexOf(key2) !== -1);
    const newObj = { ...a, ...b };
    for (const key2 of sharedKeys) {
      const sharedValue = mergeValues(a[key2], b[key2]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key2] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index8 = 0; index8 < a.length; index8++) {
      const itemA = a[index8];
      const itemB = b[index8];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
__name(mergeValues, "mergeValues");
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
__name(createZodEnum, "createZodEnum");
function custom(check, params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
}
__name(custom, "custom");
var util;
var objectUtil;
var ZodParsedType;
var getParsedType;
var ZodIssueCode;
var quotelessJson;
var ZodError;
var errorMap;
var overrideErrorMap;
var makeIssue;
var EMPTY_PATH;
var ParseStatus;
var INVALID;
var DIRTY2;
var OK;
var isAborted;
var isDirty;
var isValid;
var isAsync;
var errorUtil;
var _ZodEnum_cache;
var _ZodNativeEnum_cache;
var ParseInputLazyPath;
var handleResult;
var ZodType;
var cuidRegex;
var cuid2Regex;
var ulidRegex;
var uuidRegex;
var nanoidRegex;
var durationRegex;
var emailRegex;
var _emojiRegex;
var emojiRegex;
var ipv4Regex;
var ipv6Regex;
var base64Regex;
var dateRegexSource;
var dateRegex;
var ZodString;
var ZodNumber;
var ZodBigInt;
var ZodBoolean;
var ZodDate;
var ZodSymbol;
var ZodUndefined;
var ZodNull;
var ZodAny;
var ZodUnknown;
var ZodNever;
var ZodVoid;
var ZodArray;
var ZodObject;
var ZodUnion;
var getDiscriminator;
var ZodDiscriminatedUnion;
var ZodIntersection;
var ZodTuple;
var ZodRecord;
var ZodMap;
var ZodSet;
var ZodFunction;
var ZodLazy;
var ZodLiteral;
var ZodEnum;
var ZodNativeEnum;
var ZodPromise;
var ZodEffects;
var ZodOptional;
var ZodNullable;
var ZodDefault;
var ZodCatch;
var ZodNaN;
var BRAND;
var ZodBranded;
var ZodPipeline;
var ZodReadonly;
var late;
var ZodFirstPartyTypeKind;
var instanceOfType;
var stringType;
var numberType;
var nanType;
var bigIntType;
var booleanType;
var dateType;
var symbolType;
var undefinedType;
var nullType;
var anyType;
var unknownType;
var neverType;
var voidType;
var arrayType;
var objectType;
var strictObjectType;
var unionType;
var discriminatedUnionType;
var intersectionType;
var tupleType;
var recordType;
var mapType;
var setType;
var functionType;
var lazyType;
var literalType;
var enumType;
var nativeEnumType;
var promiseType;
var effectsType;
var optionalType;
var nullableType;
var preprocessType;
var pipelineType;
var ostring;
var onumber;
var oboolean;
var coerce;
var NEVER;
var z;
var init_lib = __esm({
  "node_modules/zod/lib/index.mjs"() {
    (function(util2) {
      util2.assertEqual = (val) => val;
      function assertIs(_arg) {
      }
      __name(assertIs, "assertIs");
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      __name(assertNever, "assertNever");
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e3) {
          return obj[e3];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key2 in object) {
          if (Object.prototype.hasOwnProperty.call(object, key2)) {
            keys.push(key2);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
      function joinValues(array2, separator = " | ") {
        return array2.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      __name(joinValues, "joinValues");
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = /* @__PURE__ */ __name((data) => {
      const t2 = typeof data;
      switch (t2) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    }, "getParsedType");
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    quotelessJson = /* @__PURE__ */ __name((obj) => {
      const json2 = JSON.stringify(obj, null, 2);
      return json2.replace(/"([^"]+)":/g, "$1:");
    }, "quotelessJson");
    ZodError = /* @__PURE__ */ __name(class _ZodError extends Error {
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      get errors() {
        return this.issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = /* @__PURE__ */ __name((error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        }, "processError");
        processError(this);
        return fieldErrors;
      }
      static assert(value) {
        if (!(value instanceof _ZodError)) {
          throw new Error(`Not a ZodError: ${value}`);
        }
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    }, "_ZodError");
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
    errorMap = /* @__PURE__ */ __name((issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message };
    }, "errorMap");
    overrideErrorMap = errorMap;
    makeIssue = /* @__PURE__ */ __name((params) => {
      const { data, path, errorMaps, issueData } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      if (issueData.message !== void 0) {
        return {
          ...issueData,
          path: fullPath,
          message: issueData.message
        };
      }
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: errorMessage
      };
    }, "makeIssue");
    EMPTY_PATH = [];
    ParseStatus = /* @__PURE__ */ __name(class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s3 of results) {
          if (s3.status === "aborted")
            return INVALID;
          if (s3.status === "dirty")
            status.dirty();
          arrayValue.push(s3.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          const key2 = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key: key2,
            value
          });
        }
        return _ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key: key2, value } = pair;
          if (key2.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key2.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key2.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key2.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    }, "_ParseStatus");
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY2 = /* @__PURE__ */ __name((value) => ({ status: "dirty", value }), "DIRTY2");
    OK = /* @__PURE__ */ __name((value) => ({ status: "valid", value }), "OK");
    isAborted = /* @__PURE__ */ __name((x) => x.status === "aborted", "isAborted");
    isDirty = /* @__PURE__ */ __name((x) => x.status === "dirty", "isDirty");
    isValid = /* @__PURE__ */ __name((x) => x.status === "valid", "isValid");
    isAsync = /* @__PURE__ */ __name((x) => typeof Promise !== "undefined" && x instanceof Promise, "isAsync");
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
    })(errorUtil || (errorUtil = {}));
    ParseInputLazyPath = /* @__PURE__ */ __name(class {
      constructor(parent, value, path, key2) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key2;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (this._key instanceof Array) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    }, "ParseInputLazyPath");
    handleResult = /* @__PURE__ */ __name((ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    }, "handleResult");
    ZodType = /* @__PURE__ */ __name(class {
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
      }
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        var _a;
        const ctx = {
          common: {
            issues: [],
            async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            async: true
          },
          path: (params === null || params === void 0 ? void 0 : params.path) || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = /* @__PURE__ */ __name((val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        }, "getIssueProperties");
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = /* @__PURE__ */ __name(() => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          }), "setError");
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this, this._def);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    }, "ZodType");
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[0-9a-z]+$/;
    ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
    uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    nanoidRegex = /^[a-z0-9_-]{21}$/i;
    durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
    base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
    dateRegex = new RegExp(`^${dateRegexSource}$`);
    ZodString = /* @__PURE__ */ __name(class _ZodString extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.string,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "emoji",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "nanoid") {
            if (!nanoidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "nanoid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ulid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch (_a) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "date") {
            const regex = dateRegex;
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "date",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "time") {
            const regex = timeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "time",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "duration") {
            if (!durationRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "duration",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ip",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64") {
            if (!base64Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "base64",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
      }
      _addCheck(check) {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
      }
      base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
      }
      ip(options2) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options2) });
      }
      datetime(options2) {
        var _a, _b;
        if (typeof options2 === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            local: false,
            message: options2
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) === "undefined" ? null : options2 === null || options2 === void 0 ? void 0 : options2.precision,
          offset: (_a = options2 === null || options2 === void 0 ? void 0 : options2.offset) !== null && _a !== void 0 ? _a : false,
          local: (_b = options2 === null || options2 === void 0 ? void 0 : options2.local) !== null && _b !== void 0 ? _b : false,
          ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
        });
      }
      date(message) {
        return this._addCheck({ kind: "date", message });
      }
      time(options2) {
        if (typeof options2 === "string") {
          return this._addCheck({
            kind: "time",
            precision: null,
            message: options2
          });
        }
        return this._addCheck({
          kind: "time",
          precision: typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) === "undefined" ? null : options2 === null || options2 === void 0 ? void 0 : options2.precision,
          ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
        });
      }
      duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      includes(value, options2) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options2 === null || options2 === void 0 ? void 0 : options2.position,
          ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      /**
       * @deprecated Use z.string().min(1) instead.
       * @see {@link ZodString.min}
       */
      nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
      }
      trim() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
      }
      get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
      }
      get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    }, "_ZodString");
    ZodString.create = (params) => {
      var _a;
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = /* @__PURE__ */ __name(class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    }, "_ZodNumber");
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = /* @__PURE__ */ __name(class _ZodBigInt extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.bigint,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    }, "_ZodBigInt");
    ZodBigInt.create = (params) => {
      var _a;
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    }, "ZodBoolean");
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = /* @__PURE__ */ __name(class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new _ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    }, "_ZodDate");
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    }, "ZodSymbol");
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    }, "ZodUndefined");
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    }, "ZodNull");
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = /* @__PURE__ */ __name(class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    }, "ZodAny");
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = /* @__PURE__ */ __name(class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    }, "ZodUnknown");
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    }, "ZodNever");
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    }, "ZodVoid");
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = /* @__PURE__ */ __name(class _ZodArray extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new _ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new _ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new _ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    }, "_ZodArray");
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    ZodObject = /* @__PURE__ */ __name(class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return this._cached = { shape, keys };
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key2 in ctx.data) {
            if (!shapeKeys.includes(key2)) {
              extraKeys.push(key2);
            }
          }
        }
        const pairs = [];
        for (const key2 of shapeKeys) {
          const keyValidator = shape[key2];
          const value = ctx.data[key2];
          pairs.push({
            key: { status: "valid", value: key2 },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key2)),
            alwaysSet: key2 in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key2 of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key2 },
                value: { status: "valid", value: ctx.data[key2] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip")
            ;
          else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key2 of extraKeys) {
            const value = ctx.data[key2];
            pairs.push({
              key: { status: "valid", value: key2 },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key2)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key2 in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key2 = await pair.key;
              const value = await pair.value;
              syncPairs.push({
                key: key2,
                value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              var _a, _b, _c, _d;
              const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new _ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key2, schema) {
        return this.augment({ [key2]: schema });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index8) {
        return new _ZodObject({
          ...this._def,
          catchall: index8
        });
      }
      pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key2) => {
          if (mask[key2] && this.shape[key2]) {
            shape[key2] = this.shape[key2];
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          if (!mask[key2]) {
            shape[key2] = this.shape[key2];
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          const fieldSchema = this.shape[key2];
          if (mask && !mask[key2]) {
            newShape[key2] = fieldSchema;
          } else {
            newShape[key2] = fieldSchema.optional();
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key2) => {
          if (mask && !mask[key2]) {
            newShape[key2] = this.shape[key2];
          } else {
            const fieldSchema = this.shape[key2];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key2] = newField;
          }
        });
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    }, "_ZodObject");
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options2 = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        __name(handleResults, "handleResults");
        if (ctx.common.async) {
          return Promise.all(options2.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options2) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    }, "ZodUnion");
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = /* @__PURE__ */ __name((type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return util.objectValues(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else if (type instanceof ZodOptional) {
        return [void 0, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
      } else {
        return [];
      }
    }, "getDiscriminator");
    ZodDiscriminatedUnion = /* @__PURE__ */ __name(class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options2, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options2) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues.length) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options: options2,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    }, "_ZodDiscriminatedUnion");
    ZodIntersection = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = /* @__PURE__ */ __name((parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        }, "handleParsed");
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    }, "ZodIntersection");
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = /* @__PURE__ */ __name(class _ZodTuple extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple({
          ...this._def,
          rest
        });
      }
    }, "_ZodTuple");
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = /* @__PURE__ */ __name(class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key2 in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key2, ctx.path, key2)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key2], ctx.path, key2)),
            alwaysSet: key2 in ctx.data
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new _ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    }, "_ZodRecord");
    ZodMap = /* @__PURE__ */ __name(class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key2, value], index8) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key2, ctx.path, [index8, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index8, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key2 = await pair.key;
              const value = await pair.value;
              if (key2.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key2.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key2.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key2 = pair.key;
            const value = pair.value;
            if (key2.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key2.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key2.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    }, "ZodMap");
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = /* @__PURE__ */ __name(class _ZodSet extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        __name(finalizeSet, "finalizeSet");
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new _ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new _ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    }, "_ZodSet");
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = /* @__PURE__ */ __name(class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        __name(makeArgsIssue, "makeArgsIssue");
        function makeReturnsIssue(returns, error) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [
              ctx.common.contextualErrorMap,
              ctx.schemaErrorMap,
              getErrorMap(),
              errorMap
            ].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        __name(makeReturnsIssue, "makeReturnsIssue");
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return OK(async function(...args) {
            const error = new ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e3) => {
              error.addIssue(makeArgsIssue(args, e3));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e3) => {
              error.addIssue(makeReturnsIssue(result, e3));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return OK(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new _ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    }, "_ZodFunction");
    ZodLazy = /* @__PURE__ */ __name(class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    }, "ZodLazy");
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    }, "ZodLiteral");
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = /* @__PURE__ */ __name(class _ZodEnum extends ZodType {
      constructor() {
        super(...arguments);
        _ZodEnum_cache.set(this, void 0);
      }
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
          __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values, newDef = this._def) {
        return _ZodEnum.create(values, {
          ...this._def,
          ...newDef
        });
      }
      exclude(values, newDef = this._def) {
        return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
          ...this._def,
          ...newDef
        });
      }
    }, "_ZodEnum");
    _ZodEnum_cache = /* @__PURE__ */ new WeakMap();
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = /* @__PURE__ */ __name(class extends ZodType {
      constructor() {
        super(...arguments);
        _ZodNativeEnum_cache.set(this, void 0);
      }
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
          __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    }, "ZodNativeEnum");
    _ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = /* @__PURE__ */ __name(class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    }, "ZodPromise");
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = /* @__PURE__ */ __name(class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect2 = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect2.type === "preprocess") {
          const processed = effect2.transform(ctx.data, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(processed).then(async (processed2) => {
              if (status.value === "aborted")
                return INVALID;
              const result = await this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
              if (result.status === "aborted")
                return INVALID;
              if (result.status === "dirty")
                return DIRTY2(result.value);
              if (status.value === "dirty")
                return DIRTY2(result.value);
              return result;
            });
          } else {
            if (status.value === "aborted")
              return INVALID;
            const result = this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted")
              return INVALID;
            if (result.status === "dirty")
              return DIRTY2(result.value);
            if (status.value === "dirty")
              return DIRTY2(result.value);
            return result;
          }
        }
        if (effect2.type === "refinement") {
          const executeRefinement = /* @__PURE__ */ __name((acc) => {
            const result = effect2.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          }, "executeRefinement");
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect2.type === "transform") {
          if (ctx.common.async === false) {
            const base2 = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base2))
              return base2;
            const result = effect2.transform(base2.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base2) => {
              if (!isValid(base2))
                return base2;
              return Promise.resolve(effect2.transform(base2.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
            });
          }
        }
        util.assertNever(effect2);
      }
    }, "ZodEffects");
    ZodEffects.create = (schema, effect2, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: effect2,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    }, "ZodOptional");
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    }, "ZodNullable");
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    }, "ZodDefault");
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    }, "ZodCatch");
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    ZodNaN = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    }, "ZodNaN");
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    ZodBranded = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    }, "ZodBranded");
    ZodPipeline = /* @__PURE__ */ __name(class _ZodPipeline extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = /* @__PURE__ */ __name(async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY2(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          }, "handleAsync");
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new _ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    }, "_ZodPipeline");
    ZodReadonly = /* @__PURE__ */ __name(class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = /* @__PURE__ */ __name((data) => {
          if (isValid(data)) {
            data.value = Object.freeze(data.value);
          }
          return data;
        }, "freeze");
        return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
      }
      unwrap() {
        return this._def.innerType;
      }
    }, "ZodReadonly");
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    instanceOfType = /* @__PURE__ */ __name((cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params), "instanceOfType");
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
    ostring = /* @__PURE__ */ __name(() => stringType().optional(), "ostring");
    onumber = /* @__PURE__ */ __name(() => numberType().optional(), "onumber");
    oboolean = /* @__PURE__ */ __name(() => booleanType().optional(), "oboolean");
    coerce = {
      string: (arg) => ZodString.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate.create({ ...arg, coerce: true })
    };
    NEVER = INVALID;
    z = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      defaultErrorMap: errorMap,
      setErrorMap,
      getErrorMap,
      makeIssue,
      EMPTY_PATH,
      addIssueToContext,
      ParseStatus,
      INVALID,
      DIRTY: DIRTY2,
      OK,
      isAborted,
      isDirty,
      isValid,
      isAsync,
      get util() {
        return util;
      },
      get objectUtil() {
        return objectUtil;
      },
      ZodParsedType,
      getParsedType,
      ZodType,
      datetimeRegex,
      ZodString,
      ZodNumber,
      ZodBigInt,
      ZodBoolean,
      ZodDate,
      ZodSymbol,
      ZodUndefined,
      ZodNull,
      ZodAny,
      ZodUnknown,
      ZodNever,
      ZodVoid,
      ZodArray,
      ZodObject,
      ZodUnion,
      ZodDiscriminatedUnion,
      ZodIntersection,
      ZodTuple,
      ZodRecord,
      ZodMap,
      ZodSet,
      ZodFunction,
      ZodLazy,
      ZodLiteral,
      ZodEnum,
      ZodNativeEnum,
      ZodPromise,
      ZodEffects,
      ZodTransformer: ZodEffects,
      ZodOptional,
      ZodNullable,
      ZodDefault,
      ZodCatch,
      ZodNaN,
      BRAND,
      ZodBranded,
      ZodPipeline,
      ZodReadonly,
      custom,
      Schema: ZodType,
      ZodSchema: ZodType,
      late,
      get ZodFirstPartyTypeKind() {
        return ZodFirstPartyTypeKind;
      },
      coerce,
      any: anyType,
      array: arrayType,
      bigint: bigIntType,
      boolean: booleanType,
      date: dateType,
      discriminatedUnion: discriminatedUnionType,
      effect: effectsType,
      "enum": enumType,
      "function": functionType,
      "instanceof": instanceOfType,
      intersection: intersectionType,
      lazy: lazyType,
      literal: literalType,
      map: mapType,
      nan: nanType,
      nativeEnum: nativeEnumType,
      never: neverType,
      "null": nullType,
      nullable: nullableType,
      number: numberType,
      object: objectType,
      oboolean,
      onumber,
      optional: optionalType,
      ostring,
      pipeline: pipelineType,
      preprocess: preprocessType,
      promise: promiseType,
      record: recordType,
      set: setType,
      strictObject: strictObjectType,
      string: stringType,
      symbol: symbolType,
      transformer: effectsType,
      tuple: tupleType,
      "undefined": undefinedType,
      union: unionType,
      unknown: unknownType,
      "void": voidType,
      NEVER,
      ZodIssueCode,
      quotelessJson,
      ZodError
    });
  }
});
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  actions: () => actions,
  load: () => load
});
async function verifyCaptcha(token) {
  const body2 = new FormData();
  body2.append("secret", RECAPTCHA_SECRET_KEY);
  body2.append("response", token);
  const response = await (await fetch("https://www.google.com/recaptcha/api/siteverify", {
    body: body2,
    method: "POST"
  })).json();
  if (response?.success)
    return true;
  return false;
}
__name(verifyCaptcha, "verifyCaptcha");
function convertToObject(d) {
  const result = {};
  d.forEach((value, key2) => {
    result[key2] = value;
  });
  return result;
}
__name(convertToObject, "convertToObject");
var RECAPTCHA_SECRET_KEY;
var NAME_MAX_LENGTH;
var EMAIL_MAX_LENGTH;
var BODY_MAX_LENGTH;
var categoryKeys;
var CATEGORY_OPTIONS;
var requestBodySchema;
var load;
var actions;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/contact/_page.server.ts.js"() {
    init_lib();
    RECAPTCHA_SECRET_KEY = "6LcrCHcqAAAAADsNZ3V83dGZ-DR3EZLeAb3thEPb";
    NAME_MAX_LENGTH = 99;
    EMAIL_MAX_LENGTH = 254;
    BODY_MAX_LENGTH = 999;
    categoryKeys = ["concert", "others"];
    CATEGORY_OPTIONS = {
      concert: "\u6F14\u594F\u4F1A\u306B\u3064\u3044\u3066",
      others: "\u305D\u306E\u4ED6"
    };
    requestBodySchema = z.object({
      name: z.string().max(NAME_MAX_LENGTH),
      email: z.string().email().max(EMAIL_MAX_LENGTH),
      category: z.enum(categoryKeys),
      body: z.string().max(BODY_MAX_LENGTH),
      csrfToken: z.string(),
      reCaptchaToken: z.string()
    });
    load = /* @__PURE__ */ __name(async ({ locals }) => {
      const { session } = locals;
      if (session.data.csrfToken === void 0) {
        await session.setData({
          csrfToken: crypto.randomUUID()
        });
        await session.save();
      }
      return {
        NAME_MAX_LENGTH,
        EMAIL_MAX_LENGTH,
        CATEGORY_OPTIONS,
        BODY_MAX_LENGTH,
        csrfToken: session.data.csrfToken
      };
    }, "load");
    actions = {
      default: async ({ locals, request }) => {
        const { session } = locals;
        const rawRequestBody = convertToObject(await request.formData());
        const validationResult = requestBodySchema.safeParse(rawRequestBody);
        if (!validationResult.success) {
          return { success: false, message: "Invalid request body" };
        }
        const requestBody = validationResult.data;
        const csrfResult = requestBody.csrfToken === session.data.csrfToken;
        if (!csrfResult) {
          return { success: false, message: "Invalid CSRF token" };
        }
        const captchaResult = verifyCaptcha(requestBody.reCaptchaToken);
        if (!captchaResult) {
          return { success: false, message: "Invalid CAPTCHA token" };
        }
        return { success: true };
      }
    };
  }
});
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => _page3
});
function _page3($$payload, $$props) {
  push();
  let { data, form } = $$props;
  const RECAPTCHA_SITE_KEY = "6LcrCHcqAAAAAGwoYDnJR4xmIUNSfzCdgYZowBpX";
  let isSubmitting = false;
  const each_array = ensure_array_like(Object.entries(data.CATEGORY_OPTIONS));
  head($$payload, ($$payload2) => {
    $$payload2.out += `<script${attr("src", `https://www.google.com/recaptcha/api.js?render=${stringify(RECAPTCHA_SITE_KEY)}`)} async><\/script><!---->`;
  });
  $$payload.out += `<form method="POST"><label>\u304A\u540D\u524D <input name="name" type="text"${attr("maxlength", data.NAME_MAX_LENGTH)}${attr("disabled", isSubmitting, true)}></label> <label>\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9 <input name="email" type="email"${attr("maxlength", data.EMAIL_MAX_LENGTH)} required${attr("disabled", isSubmitting, true)}></label> <label>\u30AB\u30C6\u30B4\u30EA\u30FC <select name="category" required${attr("disabled", isSubmitting, true)}><option value="" hidden selected></option><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [key2, description] = each_array[$$index];
    $$payload.out += `<option${attr("value", key2)}>${escape_html(description)}</option>`;
  }
  $$payload.out += `<!--]--></select></label> <label>\u672C\u6587 <textarea name="body"${attr("maxlength", data.BODY_MAX_LENGTH)}${attr("disabled", isSubmitting, true)}></textarea></label> <input name="csrfToken" type="hidden"${attr("value", data.csrfToken)}> <button type="submit"${attr("disabled", isSubmitting, true)}>\u9001\u4FE1</button> <p class="recaptcha-description">\u3053\u306E\u30B5\u30A4\u30C8\u306FreCAPTCHA\u306B\u3088\u3063\u3066\u4FDD\u8B77\u3055\u308C\u3066\u304A\u308A\u3001Google\u306E <a href="https://policies.google.com/privacy">\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC</a> \u3068 <a href="https://policies.google.com/terms">\u5229\u7528\u898F\u7D04</a> \u304C\u9069\u7528\u3055\u308C\u307E\u3059\u3002</p></form>`;
  pop();
}
__name(_page3, "_page3");
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/contact/_page.svelte.js"() {
    init_index3();
    init_client();
  }
});
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  server: () => page_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets5
});
var index5;
var component_cache5;
var component5;
var server_id;
var imports5;
var stylesheets5;
var fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_page_server_ts();
    index5 = 4;
    component5 = /* @__PURE__ */ __name(async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default, "component5");
    server_id = "src/routes/contact/+page.server.ts";
    imports5 = ["_app/immutable/nodes/4.BXdJpDUL.js", "_app/immutable/chunks/disclose-version._bx3ty70.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/render.D7WQuqm4.js", "_app/immutable/chunks/svelte-head.CnFvDmQ8.js", "_app/immutable/chunks/forms.BYV2KZDa.js", "_app/immutable/chunks/entry.k1rp80hB.js", "_app/immutable/chunks/index.CkknOhtp.js", "_app/immutable/chunks/attributes.CwDe2KbA.js"];
    stylesheets5 = ["_app/immutable/assets/4.B_5BGZlB.css"];
    fonts5 = [];
  }
});
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  actions: () => actions2,
  load: () => load2
});
var words;
var allowed;
var Game;
var load2;
var actions2;
var init_page_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/sverdle/_page.server.ts.js"() {
    init_chunks();
    words = [
      "aback",
      "abase",
      "abate",
      "abbey",
      "abbot",
      "abhor",
      "abide",
      "abled",
      "abode",
      "abort",
      "about",
      "above",
      "abuse",
      "abyss",
      "acorn",
      "acrid",
      "actor",
      "acute",
      "adage",
      "adapt",
      "adept",
      "admin",
      "admit",
      "adobe",
      "adopt",
      "adore",
      "adorn",
      "adult",
      "affix",
      "afire",
      "afoot",
      "afoul",
      "after",
      "again",
      "agape",
      "agate",
      "agent",
      "agile",
      "aging",
      "aglow",
      "agony",
      "agora",
      "agree",
      "ahead",
      "aider",
      "aisle",
      "alarm",
      "album",
      "alert",
      "algae",
      "alibi",
      "alien",
      "align",
      "alike",
      "alive",
      "allay",
      "alley",
      "allot",
      "allow",
      "alloy",
      "aloft",
      "alone",
      "along",
      "aloof",
      "aloud",
      "alpha",
      "altar",
      "alter",
      "amass",
      "amaze",
      "amber",
      "amble",
      "amend",
      "amiss",
      "amity",
      "among",
      "ample",
      "amply",
      "amuse",
      "angel",
      "anger",
      "angle",
      "angry",
      "angst",
      "anime",
      "ankle",
      "annex",
      "annoy",
      "annul",
      "anode",
      "antic",
      "anvil",
      "aorta",
      "apart",
      "aphid",
      "aping",
      "apnea",
      "apple",
      "apply",
      "apron",
      "aptly",
      "arbor",
      "ardor",
      "arena",
      "argue",
      "arise",
      "armor",
      "aroma",
      "arose",
      "array",
      "arrow",
      "arson",
      "artsy",
      "ascot",
      "ashen",
      "aside",
      "askew",
      "assay",
      "asset",
      "atoll",
      "atone",
      "attic",
      "audio",
      "audit",
      "augur",
      "aunty",
      "avail",
      "avert",
      "avian",
      "avoid",
      "await",
      "awake",
      "award",
      "aware",
      "awash",
      "awful",
      "awoke",
      "axial",
      "axiom",
      "axion",
      "azure",
      "bacon",
      "badge",
      "badly",
      "bagel",
      "baggy",
      "baker",
      "baler",
      "balmy",
      "banal",
      "banjo",
      "barge",
      "baron",
      "basal",
      "basic",
      "basil",
      "basin",
      "basis",
      "baste",
      "batch",
      "bathe",
      "baton",
      "batty",
      "bawdy",
      "bayou",
      "beach",
      "beady",
      "beard",
      "beast",
      "beech",
      "beefy",
      "befit",
      "began",
      "begat",
      "beget",
      "begin",
      "begun",
      "being",
      "belch",
      "belie",
      "belle",
      "belly",
      "below",
      "bench",
      "beret",
      "berry",
      "berth",
      "beset",
      "betel",
      "bevel",
      "bezel",
      "bible",
      "bicep",
      "biddy",
      "bigot",
      "bilge",
      "billy",
      "binge",
      "bingo",
      "biome",
      "birch",
      "birth",
      "bison",
      "bitty",
      "black",
      "blade",
      "blame",
      "bland",
      "blank",
      "blare",
      "blast",
      "blaze",
      "bleak",
      "bleat",
      "bleed",
      "bleep",
      "blend",
      "bless",
      "blimp",
      "blind",
      "blink",
      "bliss",
      "blitz",
      "bloat",
      "block",
      "bloke",
      "blond",
      "blood",
      "bloom",
      "blown",
      "bluer",
      "bluff",
      "blunt",
      "blurb",
      "blurt",
      "blush",
      "board",
      "boast",
      "bobby",
      "boney",
      "bongo",
      "bonus",
      "booby",
      "boost",
      "booth",
      "booty",
      "booze",
      "boozy",
      "borax",
      "borne",
      "bosom",
      "bossy",
      "botch",
      "bough",
      "boule",
      "bound",
      "bowel",
      "boxer",
      "brace",
      "braid",
      "brain",
      "brake",
      "brand",
      "brash",
      "brass",
      "brave",
      "bravo",
      "brawl",
      "brawn",
      "bread",
      "break",
      "breed",
      "briar",
      "bribe",
      "brick",
      "bride",
      "brief",
      "brine",
      "bring",
      "brink",
      "briny",
      "brisk",
      "broad",
      "broil",
      "broke",
      "brood",
      "brook",
      "broom",
      "broth",
      "brown",
      "brunt",
      "brush",
      "brute",
      "buddy",
      "budge",
      "buggy",
      "bugle",
      "build",
      "built",
      "bulge",
      "bulky",
      "bully",
      "bunch",
      "bunny",
      "burly",
      "burnt",
      "burst",
      "bused",
      "bushy",
      "butch",
      "butte",
      "buxom",
      "buyer",
      "bylaw",
      "cabal",
      "cabby",
      "cabin",
      "cable",
      "cacao",
      "cache",
      "cacti",
      "caddy",
      "cadet",
      "cagey",
      "cairn",
      "camel",
      "cameo",
      "canal",
      "candy",
      "canny",
      "canoe",
      "canon",
      "caper",
      "caput",
      "carat",
      "cargo",
      "carol",
      "carry",
      "carve",
      "caste",
      "catch",
      "cater",
      "catty",
      "caulk",
      "cause",
      "cavil",
      "cease",
      "cedar",
      "cello",
      "chafe",
      "chaff",
      "chain",
      "chair",
      "chalk",
      "champ",
      "chant",
      "chaos",
      "chard",
      "charm",
      "chart",
      "chase",
      "chasm",
      "cheap",
      "cheat",
      "check",
      "cheek",
      "cheer",
      "chess",
      "chest",
      "chick",
      "chide",
      "chief",
      "child",
      "chili",
      "chill",
      "chime",
      "china",
      "chirp",
      "chock",
      "choir",
      "choke",
      "chord",
      "chore",
      "chose",
      "chuck",
      "chump",
      "chunk",
      "churn",
      "chute",
      "cider",
      "cigar",
      "cinch",
      "circa",
      "civic",
      "civil",
      "clack",
      "claim",
      "clamp",
      "clang",
      "clank",
      "clash",
      "clasp",
      "class",
      "clean",
      "clear",
      "cleat",
      "cleft",
      "clerk",
      "click",
      "cliff",
      "climb",
      "cling",
      "clink",
      "cloak",
      "clock",
      "clone",
      "close",
      "cloth",
      "cloud",
      "clout",
      "clove",
      "clown",
      "cluck",
      "clued",
      "clump",
      "clung",
      "coach",
      "coast",
      "cobra",
      "cocoa",
      "colon",
      "color",
      "comet",
      "comfy",
      "comic",
      "comma",
      "conch",
      "condo",
      "conic",
      "copse",
      "coral",
      "corer",
      "corny",
      "couch",
      "cough",
      "could",
      "count",
      "coupe",
      "court",
      "coven",
      "cover",
      "covet",
      "covey",
      "cower",
      "coyly",
      "crack",
      "craft",
      "cramp",
      "crane",
      "crank",
      "crash",
      "crass",
      "crate",
      "crave",
      "crawl",
      "craze",
      "crazy",
      "creak",
      "cream",
      "credo",
      "creed",
      "creek",
      "creep",
      "creme",
      "crepe",
      "crept",
      "cress",
      "crest",
      "crick",
      "cried",
      "crier",
      "crime",
      "crimp",
      "crisp",
      "croak",
      "crock",
      "crone",
      "crony",
      "crook",
      "cross",
      "croup",
      "crowd",
      "crown",
      "crude",
      "cruel",
      "crumb",
      "crump",
      "crush",
      "crust",
      "crypt",
      "cubic",
      "cumin",
      "curio",
      "curly",
      "curry",
      "curse",
      "curve",
      "curvy",
      "cutie",
      "cyber",
      "cycle",
      "cynic",
      "daddy",
      "daily",
      "dairy",
      "daisy",
      "dally",
      "dance",
      "dandy",
      "datum",
      "daunt",
      "dealt",
      "death",
      "debar",
      "debit",
      "debug",
      "debut",
      "decal",
      "decay",
      "decor",
      "decoy",
      "decry",
      "defer",
      "deign",
      "deity",
      "delay",
      "delta",
      "delve",
      "demon",
      "demur",
      "denim",
      "dense",
      "depot",
      "depth",
      "derby",
      "deter",
      "detox",
      "deuce",
      "devil",
      "diary",
      "dicey",
      "digit",
      "dilly",
      "dimly",
      "diner",
      "dingo",
      "dingy",
      "diode",
      "dirge",
      "dirty",
      "disco",
      "ditch",
      "ditto",
      "ditty",
      "diver",
      "dizzy",
      "dodge",
      "dodgy",
      "dogma",
      "doing",
      "dolly",
      "donor",
      "donut",
      "dopey",
      "doubt",
      "dough",
      "dowdy",
      "dowel",
      "downy",
      "dowry",
      "dozen",
      "draft",
      "drain",
      "drake",
      "drama",
      "drank",
      "drape",
      "drawl",
      "drawn",
      "dread",
      "dream",
      "dress",
      "dried",
      "drier",
      "drift",
      "drill",
      "drink",
      "drive",
      "droit",
      "droll",
      "drone",
      "drool",
      "droop",
      "dross",
      "drove",
      "drown",
      "druid",
      "drunk",
      "dryer",
      "dryly",
      "duchy",
      "dully",
      "dummy",
      "dumpy",
      "dunce",
      "dusky",
      "dusty",
      "dutch",
      "duvet",
      "dwarf",
      "dwell",
      "dwelt",
      "dying",
      "eager",
      "eagle",
      "early",
      "earth",
      "easel",
      "eaten",
      "eater",
      "ebony",
      "eclat",
      "edict",
      "edify",
      "eerie",
      "egret",
      "eight",
      "eject",
      "eking",
      "elate",
      "elbow",
      "elder",
      "elect",
      "elegy",
      "elfin",
      "elide",
      "elite",
      "elope",
      "elude",
      "email",
      "embed",
      "ember",
      "emcee",
      "empty",
      "enact",
      "endow",
      "enema",
      "enemy",
      "enjoy",
      "ennui",
      "ensue",
      "enter",
      "entry",
      "envoy",
      "epoch",
      "epoxy",
      "equal",
      "equip",
      "erase",
      "erect",
      "erode",
      "error",
      "erupt",
      "essay",
      "ester",
      "ether",
      "ethic",
      "ethos",
      "etude",
      "evade",
      "event",
      "every",
      "evict",
      "evoke",
      "exact",
      "exalt",
      "excel",
      "exert",
      "exile",
      "exist",
      "expel",
      "extol",
      "extra",
      "exult",
      "eying",
      "fable",
      "facet",
      "faint",
      "fairy",
      "faith",
      "false",
      "fancy",
      "fanny",
      "farce",
      "fatal",
      "fatty",
      "fault",
      "fauna",
      "favor",
      "feast",
      "fecal",
      "feign",
      "fella",
      "felon",
      "femme",
      "femur",
      "fence",
      "feral",
      "ferry",
      "fetal",
      "fetch",
      "fetid",
      "fetus",
      "fever",
      "fewer",
      "fiber",
      "fibre",
      "ficus",
      "field",
      "fiend",
      "fiery",
      "fifth",
      "fifty",
      "fight",
      "filer",
      "filet",
      "filly",
      "filmy",
      "filth",
      "final",
      "finch",
      "finer",
      "first",
      "fishy",
      "fixer",
      "fizzy",
      "fjord",
      "flack",
      "flail",
      "flair",
      "flake",
      "flaky",
      "flame",
      "flank",
      "flare",
      "flash",
      "flask",
      "fleck",
      "fleet",
      "flesh",
      "flick",
      "flier",
      "fling",
      "flint",
      "flirt",
      "float",
      "flock",
      "flood",
      "floor",
      "flora",
      "floss",
      "flour",
      "flout",
      "flown",
      "fluff",
      "fluid",
      "fluke",
      "flume",
      "flung",
      "flunk",
      "flush",
      "flute",
      "flyer",
      "foamy",
      "focal",
      "focus",
      "foggy",
      "foist",
      "folio",
      "folly",
      "foray",
      "force",
      "forge",
      "forgo",
      "forte",
      "forth",
      "forty",
      "forum",
      "found",
      "foyer",
      "frail",
      "frame",
      "frank",
      "fraud",
      "freak",
      "freed",
      "freer",
      "fresh",
      "friar",
      "fried",
      "frill",
      "frisk",
      "fritz",
      "frock",
      "frond",
      "front",
      "frost",
      "froth",
      "frown",
      "froze",
      "fruit",
      "fudge",
      "fugue",
      "fully",
      "fungi",
      "funky",
      "funny",
      "furor",
      "furry",
      "fussy",
      "fuzzy",
      "gaffe",
      "gaily",
      "gamer",
      "gamma",
      "gamut",
      "gassy",
      "gaudy",
      "gauge",
      "gaunt",
      "gauze",
      "gavel",
      "gawky",
      "gayer",
      "gayly",
      "gazer",
      "gecko",
      "geeky",
      "geese",
      "genie",
      "genre",
      "ghost",
      "ghoul",
      "giant",
      "giddy",
      "gipsy",
      "girly",
      "girth",
      "given",
      "giver",
      "glade",
      "gland",
      "glare",
      "glass",
      "glaze",
      "gleam",
      "glean",
      "glide",
      "glint",
      "gloat",
      "globe",
      "gloom",
      "glory",
      "gloss",
      "glove",
      "glyph",
      "gnash",
      "gnome",
      "godly",
      "going",
      "golem",
      "golly",
      "gonad",
      "goner",
      "goody",
      "gooey",
      "goofy",
      "goose",
      "gorge",
      "gouge",
      "gourd",
      "grace",
      "grade",
      "graft",
      "grail",
      "grain",
      "grand",
      "grant",
      "grape",
      "graph",
      "grasp",
      "grass",
      "grate",
      "grave",
      "gravy",
      "graze",
      "great",
      "greed",
      "green",
      "greet",
      "grief",
      "grill",
      "grime",
      "grimy",
      "grind",
      "gripe",
      "groan",
      "groin",
      "groom",
      "grope",
      "gross",
      "group",
      "grout",
      "grove",
      "growl",
      "grown",
      "gruel",
      "gruff",
      "grunt",
      "guard",
      "guava",
      "guess",
      "guest",
      "guide",
      "guild",
      "guile",
      "guilt",
      "guise",
      "gulch",
      "gully",
      "gumbo",
      "gummy",
      "guppy",
      "gusto",
      "gusty",
      "gypsy",
      "habit",
      "hairy",
      "halve",
      "handy",
      "happy",
      "hardy",
      "harem",
      "harpy",
      "harry",
      "harsh",
      "haste",
      "hasty",
      "hatch",
      "hater",
      "haunt",
      "haute",
      "haven",
      "havoc",
      "hazel",
      "heady",
      "heard",
      "heart",
      "heath",
      "heave",
      "heavy",
      "hedge",
      "hefty",
      "heist",
      "helix",
      "hello",
      "hence",
      "heron",
      "hilly",
      "hinge",
      "hippo",
      "hippy",
      "hitch",
      "hoard",
      "hobby",
      "hoist",
      "holly",
      "homer",
      "honey",
      "honor",
      "horde",
      "horny",
      "horse",
      "hotel",
      "hotly",
      "hound",
      "house",
      "hovel",
      "hover",
      "howdy",
      "human",
      "humid",
      "humor",
      "humph",
      "humus",
      "hunch",
      "hunky",
      "hurry",
      "husky",
      "hussy",
      "hutch",
      "hydro",
      "hyena",
      "hymen",
      "hyper",
      "icily",
      "icing",
      "ideal",
      "idiom",
      "idiot",
      "idler",
      "idyll",
      "igloo",
      "iliac",
      "image",
      "imbue",
      "impel",
      "imply",
      "inane",
      "inbox",
      "incur",
      "index",
      "inept",
      "inert",
      "infer",
      "ingot",
      "inlay",
      "inlet",
      "inner",
      "input",
      "inter",
      "intro",
      "ionic",
      "irate",
      "irony",
      "islet",
      "issue",
      "itchy",
      "ivory",
      "jaunt",
      "jazzy",
      "jelly",
      "jerky",
      "jetty",
      "jewel",
      "jiffy",
      "joint",
      "joist",
      "joker",
      "jolly",
      "joust",
      "judge",
      "juice",
      "juicy",
      "jumbo",
      "jumpy",
      "junta",
      "junto",
      "juror",
      "kappa",
      "karma",
      "kayak",
      "kebab",
      "khaki",
      "kinky",
      "kiosk",
      "kitty",
      "knack",
      "knave",
      "knead",
      "kneed",
      "kneel",
      "knelt",
      "knife",
      "knock",
      "knoll",
      "known",
      "koala",
      "krill",
      "label",
      "labor",
      "laden",
      "ladle",
      "lager",
      "lance",
      "lanky",
      "lapel",
      "lapse",
      "large",
      "larva",
      "lasso",
      "latch",
      "later",
      "lathe",
      "latte",
      "laugh",
      "layer",
      "leach",
      "leafy",
      "leaky",
      "leant",
      "leapt",
      "learn",
      "lease",
      "leash",
      "least",
      "leave",
      "ledge",
      "leech",
      "leery",
      "lefty",
      "legal",
      "leggy",
      "lemon",
      "lemur",
      "leper",
      "level",
      "lever",
      "libel",
      "liege",
      "light",
      "liken",
      "lilac",
      "limbo",
      "limit",
      "linen",
      "liner",
      "lingo",
      "lipid",
      "lithe",
      "liver",
      "livid",
      "llama",
      "loamy",
      "loath",
      "lobby",
      "local",
      "locus",
      "lodge",
      "lofty",
      "logic",
      "login",
      "loopy",
      "loose",
      "lorry",
      "loser",
      "louse",
      "lousy",
      "lover",
      "lower",
      "lowly",
      "loyal",
      "lucid",
      "lucky",
      "lumen",
      "lumpy",
      "lunar",
      "lunch",
      "lunge",
      "lupus",
      "lurch",
      "lurid",
      "lusty",
      "lying",
      "lymph",
      "lynch",
      "lyric",
      "macaw",
      "macho",
      "macro",
      "madam",
      "madly",
      "mafia",
      "magic",
      "magma",
      "maize",
      "major",
      "maker",
      "mambo",
      "mamma",
      "mammy",
      "manga",
      "mange",
      "mango",
      "mangy",
      "mania",
      "manic",
      "manly",
      "manor",
      "maple",
      "march",
      "marry",
      "marsh",
      "mason",
      "masse",
      "match",
      "matey",
      "mauve",
      "maxim",
      "maybe",
      "mayor",
      "mealy",
      "meant",
      "meaty",
      "mecca",
      "medal",
      "media",
      "medic",
      "melee",
      "melon",
      "mercy",
      "merge",
      "merit",
      "merry",
      "metal",
      "meter",
      "metro",
      "micro",
      "midge",
      "midst",
      "might",
      "milky",
      "mimic",
      "mince",
      "miner",
      "minim",
      "minor",
      "minty",
      "minus",
      "mirth",
      "miser",
      "missy",
      "mocha",
      "modal",
      "model",
      "modem",
      "mogul",
      "moist",
      "molar",
      "moldy",
      "money",
      "month",
      "moody",
      "moose",
      "moral",
      "moron",
      "morph",
      "mossy",
      "motel",
      "motif",
      "motor",
      "motto",
      "moult",
      "mound",
      "mount",
      "mourn",
      "mouse",
      "mouth",
      "mover",
      "movie",
      "mower",
      "mucky",
      "mucus",
      "muddy",
      "mulch",
      "mummy",
      "munch",
      "mural",
      "murky",
      "mushy",
      "music",
      "musky",
      "musty",
      "myrrh",
      "nadir",
      "naive",
      "nanny",
      "nasal",
      "nasty",
      "natal",
      "naval",
      "navel",
      "needy",
      "neigh",
      "nerdy",
      "nerve",
      "never",
      "newer",
      "newly",
      "nicer",
      "niche",
      "niece",
      "night",
      "ninja",
      "ninny",
      "ninth",
      "noble",
      "nobly",
      "noise",
      "noisy",
      "nomad",
      "noose",
      "north",
      "nosey",
      "notch",
      "novel",
      "nudge",
      "nurse",
      "nutty",
      "nylon",
      "nymph",
      "oaken",
      "obese",
      "occur",
      "ocean",
      "octal",
      "octet",
      "odder",
      "oddly",
      "offal",
      "offer",
      "often",
      "olden",
      "older",
      "olive",
      "ombre",
      "omega",
      "onion",
      "onset",
      "opera",
      "opine",
      "opium",
      "optic",
      "orbit",
      "order",
      "organ",
      "other",
      "otter",
      "ought",
      "ounce",
      "outdo",
      "outer",
      "outgo",
      "ovary",
      "ovate",
      "overt",
      "ovine",
      "ovoid",
      "owing",
      "owner",
      "oxide",
      "ozone",
      "paddy",
      "pagan",
      "paint",
      "paler",
      "palsy",
      "panel",
      "panic",
      "pansy",
      "papal",
      "paper",
      "parer",
      "parka",
      "parry",
      "parse",
      "party",
      "pasta",
      "paste",
      "pasty",
      "patch",
      "patio",
      "patsy",
      "patty",
      "pause",
      "payee",
      "payer",
      "peace",
      "peach",
      "pearl",
      "pecan",
      "pedal",
      "penal",
      "pence",
      "penne",
      "penny",
      "perch",
      "peril",
      "perky",
      "pesky",
      "pesto",
      "petal",
      "petty",
      "phase",
      "phone",
      "phony",
      "photo",
      "piano",
      "picky",
      "piece",
      "piety",
      "piggy",
      "pilot",
      "pinch",
      "piney",
      "pinky",
      "pinto",
      "piper",
      "pique",
      "pitch",
      "pithy",
      "pivot",
      "pixel",
      "pixie",
      "pizza",
      "place",
      "plaid",
      "plain",
      "plait",
      "plane",
      "plank",
      "plant",
      "plate",
      "plaza",
      "plead",
      "pleat",
      "plied",
      "plier",
      "pluck",
      "plumb",
      "plume",
      "plump",
      "plunk",
      "plush",
      "poesy",
      "point",
      "poise",
      "poker",
      "polar",
      "polka",
      "polyp",
      "pooch",
      "poppy",
      "porch",
      "poser",
      "posit",
      "posse",
      "pouch",
      "pound",
      "pouty",
      "power",
      "prank",
      "prawn",
      "preen",
      "press",
      "price",
      "prick",
      "pride",
      "pried",
      "prime",
      "primo",
      "print",
      "prior",
      "prism",
      "privy",
      "prize",
      "probe",
      "prone",
      "prong",
      "proof",
      "prose",
      "proud",
      "prove",
      "prowl",
      "proxy",
      "prude",
      "prune",
      "psalm",
      "pubic",
      "pudgy",
      "puffy",
      "pulpy",
      "pulse",
      "punch",
      "pupal",
      "pupil",
      "puppy",
      "puree",
      "purer",
      "purge",
      "purse",
      "pushy",
      "putty",
      "pygmy",
      "quack",
      "quail",
      "quake",
      "qualm",
      "quark",
      "quart",
      "quash",
      "quasi",
      "queen",
      "queer",
      "quell",
      "query",
      "quest",
      "queue",
      "quick",
      "quiet",
      "quill",
      "quilt",
      "quirk",
      "quite",
      "quota",
      "quote",
      "quoth",
      "rabbi",
      "rabid",
      "racer",
      "radar",
      "radii",
      "radio",
      "rainy",
      "raise",
      "rajah",
      "rally",
      "ralph",
      "ramen",
      "ranch",
      "randy",
      "range",
      "rapid",
      "rarer",
      "raspy",
      "ratio",
      "ratty",
      "raven",
      "rayon",
      "razor",
      "reach",
      "react",
      "ready",
      "realm",
      "rearm",
      "rebar",
      "rebel",
      "rebus",
      "rebut",
      "recap",
      "recur",
      "recut",
      "reedy",
      "refer",
      "refit",
      "regal",
      "rehab",
      "reign",
      "relax",
      "relay",
      "relic",
      "remit",
      "renal",
      "renew",
      "repay",
      "repel",
      "reply",
      "rerun",
      "reset",
      "resin",
      "retch",
      "retro",
      "retry",
      "reuse",
      "revel",
      "revue",
      "rhino",
      "rhyme",
      "rider",
      "ridge",
      "rifle",
      "right",
      "rigid",
      "rigor",
      "rinse",
      "ripen",
      "riper",
      "risen",
      "riser",
      "risky",
      "rival",
      "river",
      "rivet",
      "roach",
      "roast",
      "robin",
      "robot",
      "rocky",
      "rodeo",
      "roger",
      "rogue",
      "roomy",
      "roost",
      "rotor",
      "rouge",
      "rough",
      "round",
      "rouse",
      "route",
      "rover",
      "rowdy",
      "rower",
      "royal",
      "ruddy",
      "ruder",
      "rugby",
      "ruler",
      "rumba",
      "rumor",
      "rupee",
      "rural",
      "rusty",
      "sadly",
      "safer",
      "saint",
      "salad",
      "sally",
      "salon",
      "salsa",
      "salty",
      "salve",
      "salvo",
      "sandy",
      "saner",
      "sappy",
      "sassy",
      "satin",
      "satyr",
      "sauce",
      "saucy",
      "sauna",
      "saute",
      "savor",
      "savoy",
      "savvy",
      "scald",
      "scale",
      "scalp",
      "scaly",
      "scamp",
      "scant",
      "scare",
      "scarf",
      "scary",
      "scene",
      "scent",
      "scion",
      "scoff",
      "scold",
      "scone",
      "scoop",
      "scope",
      "score",
      "scorn",
      "scour",
      "scout",
      "scowl",
      "scram",
      "scrap",
      "scree",
      "screw",
      "scrub",
      "scrum",
      "scuba",
      "sedan",
      "seedy",
      "segue",
      "seize",
      "semen",
      "sense",
      "sepia",
      "serif",
      "serum",
      "serve",
      "setup",
      "seven",
      "sever",
      "sewer",
      "shack",
      "shade",
      "shady",
      "shaft",
      "shake",
      "shaky",
      "shale",
      "shall",
      "shalt",
      "shame",
      "shank",
      "shape",
      "shard",
      "share",
      "shark",
      "sharp",
      "shave",
      "shawl",
      "shear",
      "sheen",
      "sheep",
      "sheer",
      "sheet",
      "sheik",
      "shelf",
      "shell",
      "shied",
      "shift",
      "shine",
      "shiny",
      "shire",
      "shirk",
      "shirt",
      "shoal",
      "shock",
      "shone",
      "shook",
      "shoot",
      "shore",
      "shorn",
      "short",
      "shout",
      "shove",
      "shown",
      "showy",
      "shrew",
      "shrub",
      "shrug",
      "shuck",
      "shunt",
      "shush",
      "shyly",
      "siege",
      "sieve",
      "sight",
      "sigma",
      "silky",
      "silly",
      "since",
      "sinew",
      "singe",
      "siren",
      "sissy",
      "sixth",
      "sixty",
      "skate",
      "skier",
      "skiff",
      "skill",
      "skimp",
      "skirt",
      "skulk",
      "skull",
      "skunk",
      "slack",
      "slain",
      "slang",
      "slant",
      "slash",
      "slate",
      "slave",
      "sleek",
      "sleep",
      "sleet",
      "slept",
      "slice",
      "slick",
      "slide",
      "slime",
      "slimy",
      "sling",
      "slink",
      "sloop",
      "slope",
      "slosh",
      "sloth",
      "slump",
      "slung",
      "slunk",
      "slurp",
      "slush",
      "slyly",
      "smack",
      "small",
      "smart",
      "smash",
      "smear",
      "smell",
      "smelt",
      "smile",
      "smirk",
      "smite",
      "smith",
      "smock",
      "smoke",
      "smoky",
      "smote",
      "snack",
      "snail",
      "snake",
      "snaky",
      "snare",
      "snarl",
      "sneak",
      "sneer",
      "snide",
      "sniff",
      "snipe",
      "snoop",
      "snore",
      "snort",
      "snout",
      "snowy",
      "snuck",
      "snuff",
      "soapy",
      "sober",
      "soggy",
      "solar",
      "solid",
      "solve",
      "sonar",
      "sonic",
      "sooth",
      "sooty",
      "sorry",
      "sound",
      "south",
      "sower",
      "space",
      "spade",
      "spank",
      "spare",
      "spark",
      "spasm",
      "spawn",
      "speak",
      "spear",
      "speck",
      "speed",
      "spell",
      "spelt",
      "spend",
      "spent",
      "sperm",
      "spice",
      "spicy",
      "spied",
      "spiel",
      "spike",
      "spiky",
      "spill",
      "spilt",
      "spine",
      "spiny",
      "spire",
      "spite",
      "splat",
      "split",
      "spoil",
      "spoke",
      "spoof",
      "spook",
      "spool",
      "spoon",
      "spore",
      "sport",
      "spout",
      "spray",
      "spree",
      "sprig",
      "spunk",
      "spurn",
      "spurt",
      "squad",
      "squat",
      "squib",
      "stack",
      "staff",
      "stage",
      "staid",
      "stain",
      "stair",
      "stake",
      "stale",
      "stalk",
      "stall",
      "stamp",
      "stand",
      "stank",
      "stare",
      "stark",
      "start",
      "stash",
      "state",
      "stave",
      "stead",
      "steak",
      "steal",
      "steam",
      "steed",
      "steel",
      "steep",
      "steer",
      "stein",
      "stern",
      "stick",
      "stiff",
      "still",
      "stilt",
      "sting",
      "stink",
      "stint",
      "stock",
      "stoic",
      "stoke",
      "stole",
      "stomp",
      "stone",
      "stony",
      "stood",
      "stool",
      "stoop",
      "store",
      "stork",
      "storm",
      "story",
      "stout",
      "stove",
      "strap",
      "straw",
      "stray",
      "strip",
      "strut",
      "stuck",
      "study",
      "stuff",
      "stump",
      "stung",
      "stunk",
      "stunt",
      "style",
      "suave",
      "sugar",
      "suing",
      "suite",
      "sulky",
      "sully",
      "sumac",
      "sunny",
      "super",
      "surer",
      "surge",
      "surly",
      "sushi",
      "swami",
      "swamp",
      "swarm",
      "swash",
      "swath",
      "swear",
      "sweat",
      "sweep",
      "sweet",
      "swell",
      "swept",
      "swift",
      "swill",
      "swine",
      "swing",
      "swirl",
      "swish",
      "swoon",
      "swoop",
      "sword",
      "swore",
      "sworn",
      "swung",
      "synod",
      "syrup",
      "tabby",
      "table",
      "taboo",
      "tacit",
      "tacky",
      "taffy",
      "taint",
      "taken",
      "taker",
      "tally",
      "talon",
      "tamer",
      "tango",
      "tangy",
      "taper",
      "tapir",
      "tardy",
      "tarot",
      "taste",
      "tasty",
      "tatty",
      "taunt",
      "tawny",
      "teach",
      "teary",
      "tease",
      "teddy",
      "teeth",
      "tempo",
      "tenet",
      "tenor",
      "tense",
      "tenth",
      "tepee",
      "tepid",
      "terra",
      "terse",
      "testy",
      "thank",
      "theft",
      "their",
      "theme",
      "there",
      "these",
      "theta",
      "thick",
      "thief",
      "thigh",
      "thing",
      "think",
      "third",
      "thong",
      "thorn",
      "those",
      "three",
      "threw",
      "throb",
      "throw",
      "thrum",
      "thumb",
      "thump",
      "thyme",
      "tiara",
      "tibia",
      "tidal",
      "tiger",
      "tight",
      "tilde",
      "timer",
      "timid",
      "tipsy",
      "titan",
      "tithe",
      "title",
      "toast",
      "today",
      "toddy",
      "token",
      "tonal",
      "tonga",
      "tonic",
      "tooth",
      "topaz",
      "topic",
      "torch",
      "torso",
      "torus",
      "total",
      "totem",
      "touch",
      "tough",
      "towel",
      "tower",
      "toxic",
      "toxin",
      "trace",
      "track",
      "tract",
      "trade",
      "trail",
      "train",
      "trait",
      "tramp",
      "trash",
      "trawl",
      "tread",
      "treat",
      "trend",
      "triad",
      "trial",
      "tribe",
      "trice",
      "trick",
      "tried",
      "tripe",
      "trite",
      "troll",
      "troop",
      "trope",
      "trout",
      "trove",
      "truce",
      "truck",
      "truer",
      "truly",
      "trump",
      "trunk",
      "truss",
      "trust",
      "truth",
      "tryst",
      "tubal",
      "tuber",
      "tulip",
      "tulle",
      "tumor",
      "tunic",
      "turbo",
      "tutor",
      "twang",
      "tweak",
      "tweed",
      "tweet",
      "twice",
      "twine",
      "twirl",
      "twist",
      "twixt",
      "tying",
      "udder",
      "ulcer",
      "ultra",
      "umbra",
      "uncle",
      "uncut",
      "under",
      "undid",
      "undue",
      "unfed",
      "unfit",
      "unify",
      "union",
      "unite",
      "unity",
      "unlit",
      "unmet",
      "unset",
      "untie",
      "until",
      "unwed",
      "unzip",
      "upper",
      "upset",
      "urban",
      "urine",
      "usage",
      "usher",
      "using",
      "usual",
      "usurp",
      "utile",
      "utter",
      "vague",
      "valet",
      "valid",
      "valor",
      "value",
      "valve",
      "vapid",
      "vapor",
      "vault",
      "vaunt",
      "vegan",
      "venom",
      "venue",
      "verge",
      "verse",
      "verso",
      "verve",
      "vicar",
      "video",
      "vigil",
      "vigor",
      "villa",
      "vinyl",
      "viola",
      "viper",
      "viral",
      "virus",
      "visit",
      "visor",
      "vista",
      "vital",
      "vivid",
      "vixen",
      "vocal",
      "vodka",
      "vogue",
      "voice",
      "voila",
      "vomit",
      "voter",
      "vouch",
      "vowel",
      "vying",
      "wacky",
      "wafer",
      "wager",
      "wagon",
      "waist",
      "waive",
      "waltz",
      "warty",
      "waste",
      "watch",
      "water",
      "waver",
      "waxen",
      "weary",
      "weave",
      "wedge",
      "weedy",
      "weigh",
      "weird",
      "welch",
      "welsh",
      "wench",
      "whack",
      "whale",
      "wharf",
      "wheat",
      "wheel",
      "whelp",
      "where",
      "which",
      "whiff",
      "while",
      "whine",
      "whiny",
      "whirl",
      "whisk",
      "white",
      "whole",
      "whoop",
      "whose",
      "widen",
      "wider",
      "widow",
      "width",
      "wield",
      "wight",
      "willy",
      "wimpy",
      "wince",
      "winch",
      "windy",
      "wiser",
      "wispy",
      "witch",
      "witty",
      "woken",
      "woman",
      "women",
      "woody",
      "wooer",
      "wooly",
      "woozy",
      "wordy",
      "world",
      "worry",
      "worse",
      "worst",
      "worth",
      "would",
      "wound",
      "woven",
      "wrack",
      "wrath",
      "wreak",
      "wreck",
      "wrest",
      "wring",
      "wrist",
      "write",
      "wrong",
      "wrote",
      "wrung",
      "wryly",
      "yacht",
      "yearn",
      "yeast",
      "yield",
      "young",
      "youth",
      "zebra",
      "zesty",
      "zonal"
    ];
    allowed = /* @__PURE__ */ new Set([
      ...words,
      "aahed",
      "aalii",
      "aargh",
      "aarti",
      "abaca",
      "abaci",
      "abacs",
      "abaft",
      "abaka",
      "abamp",
      "aband",
      "abash",
      "abask",
      "abaya",
      "abbas",
      "abbed",
      "abbes",
      "abcee",
      "abeam",
      "abear",
      "abele",
      "abers",
      "abets",
      "abies",
      "abler",
      "ables",
      "ablet",
      "ablow",
      "abmho",
      "abohm",
      "aboil",
      "aboma",
      "aboon",
      "abord",
      "abore",
      "abram",
      "abray",
      "abrim",
      "abrin",
      "abris",
      "absey",
      "absit",
      "abuna",
      "abune",
      "abuts",
      "abuzz",
      "abyes",
      "abysm",
      "acais",
      "acari",
      "accas",
      "accoy",
      "acerb",
      "acers",
      "aceta",
      "achar",
      "ached",
      "aches",
      "achoo",
      "acids",
      "acidy",
      "acing",
      "acini",
      "ackee",
      "acker",
      "acmes",
      "acmic",
      "acned",
      "acnes",
      "acock",
      "acold",
      "acred",
      "acres",
      "acros",
      "acted",
      "actin",
      "acton",
      "acyls",
      "adaws",
      "adays",
      "adbot",
      "addax",
      "added",
      "adder",
      "addio",
      "addle",
      "adeem",
      "adhan",
      "adieu",
      "adios",
      "adits",
      "adman",
      "admen",
      "admix",
      "adobo",
      "adown",
      "adoze",
      "adrad",
      "adred",
      "adsum",
      "aduki",
      "adunc",
      "adust",
      "advew",
      "adyta",
      "adzed",
      "adzes",
      "aecia",
      "aedes",
      "aegis",
      "aeons",
      "aerie",
      "aeros",
      "aesir",
      "afald",
      "afara",
      "afars",
      "afear",
      "aflaj",
      "afore",
      "afrit",
      "afros",
      "agama",
      "agami",
      "agars",
      "agast",
      "agave",
      "agaze",
      "agene",
      "agers",
      "agger",
      "aggie",
      "aggri",
      "aggro",
      "aggry",
      "aghas",
      "agila",
      "agios",
      "agism",
      "agist",
      "agita",
      "aglee",
      "aglet",
      "agley",
      "agloo",
      "aglus",
      "agmas",
      "agoge",
      "agone",
      "agons",
      "agood",
      "agria",
      "agrin",
      "agros",
      "agued",
      "agues",
      "aguna",
      "aguti",
      "aheap",
      "ahent",
      "ahigh",
      "ahind",
      "ahing",
      "ahint",
      "ahold",
      "ahull",
      "ahuru",
      "aidas",
      "aided",
      "aides",
      "aidoi",
      "aidos",
      "aiery",
      "aigas",
      "aight",
      "ailed",
      "aimed",
      "aimer",
      "ainee",
      "ainga",
      "aioli",
      "aired",
      "airer",
      "airns",
      "airth",
      "airts",
      "aitch",
      "aitus",
      "aiver",
      "aiyee",
      "aizle",
      "ajies",
      "ajiva",
      "ajuga",
      "ajwan",
      "akees",
      "akela",
      "akene",
      "aking",
      "akita",
      "akkas",
      "alaap",
      "alack",
      "alamo",
      "aland",
      "alane",
      "alang",
      "alans",
      "alant",
      "alapa",
      "alaps",
      "alary",
      "alate",
      "alays",
      "albas",
      "albee",
      "alcid",
      "alcos",
      "aldea",
      "alder",
      "aldol",
      "aleck",
      "alecs",
      "alefs",
      "aleft",
      "aleph",
      "alews",
      "aleye",
      "alfas",
      "algal",
      "algas",
      "algid",
      "algin",
      "algor",
      "algum",
      "alias",
      "alifs",
      "aline",
      "alist",
      "aliya",
      "alkie",
      "alkos",
      "alkyd",
      "alkyl",
      "allee",
      "allel",
      "allis",
      "allod",
      "allyl",
      "almah",
      "almas",
      "almeh",
      "almes",
      "almud",
      "almug",
      "alods",
      "aloed",
      "aloes",
      "aloha",
      "aloin",
      "aloos",
      "alowe",
      "altho",
      "altos",
      "alula",
      "alums",
      "alure",
      "alvar",
      "alway",
      "amahs",
      "amain",
      "amate",
      "amaut",
      "amban",
      "ambit",
      "ambos",
      "ambry",
      "ameba",
      "ameer",
      "amene",
      "amens",
      "ament",
      "amias",
      "amice",
      "amici",
      "amide",
      "amido",
      "amids",
      "amies",
      "amiga",
      "amigo",
      "amine",
      "amino",
      "amins",
      "amirs",
      "amlas",
      "amman",
      "ammon",
      "ammos",
      "amnia",
      "amnic",
      "amnio",
      "amoks",
      "amole",
      "amort",
      "amour",
      "amove",
      "amowt",
      "amped",
      "ampul",
      "amrit",
      "amuck",
      "amyls",
      "anana",
      "anata",
      "ancho",
      "ancle",
      "ancon",
      "andro",
      "anear",
      "anele",
      "anent",
      "angas",
      "anglo",
      "anigh",
      "anile",
      "anils",
      "anima",
      "animi",
      "anion",
      "anise",
      "anker",
      "ankhs",
      "ankus",
      "anlas",
      "annal",
      "annas",
      "annat",
      "anoas",
      "anole",
      "anomy",
      "ansae",
      "antae",
      "antar",
      "antas",
      "anted",
      "antes",
      "antis",
      "antra",
      "antre",
      "antsy",
      "anura",
      "anyon",
      "apace",
      "apage",
      "apaid",
      "apayd",
      "apays",
      "apeak",
      "apeek",
      "apers",
      "apert",
      "apery",
      "apgar",
      "aphis",
      "apian",
      "apiol",
      "apish",
      "apism",
      "apode",
      "apods",
      "apoop",
      "aport",
      "appal",
      "appay",
      "appel",
      "appro",
      "appui",
      "appuy",
      "apres",
      "apses",
      "apsis",
      "apsos",
      "apted",
      "apter",
      "aquae",
      "aquas",
      "araba",
      "araks",
      "arame",
      "arars",
      "arbas",
      "arced",
      "archi",
      "arcos",
      "arcus",
      "ardeb",
      "ardri",
      "aread",
      "areae",
      "areal",
      "arear",
      "areas",
      "areca",
      "aredd",
      "arede",
      "arefy",
      "areic",
      "arene",
      "arepa",
      "arere",
      "arete",
      "arets",
      "arett",
      "argal",
      "argan",
      "argil",
      "argle",
      "argol",
      "argon",
      "argot",
      "argus",
      "arhat",
      "arias",
      "ariel",
      "ariki",
      "arils",
      "ariot",
      "arish",
      "arked",
      "arled",
      "arles",
      "armed",
      "armer",
      "armet",
      "armil",
      "arnas",
      "arnut",
      "aroba",
      "aroha",
      "aroid",
      "arpas",
      "arpen",
      "arrah",
      "arras",
      "arret",
      "arris",
      "arroz",
      "arsed",
      "arses",
      "arsey",
      "arsis",
      "artal",
      "artel",
      "artic",
      "artis",
      "aruhe",
      "arums",
      "arval",
      "arvee",
      "arvos",
      "aryls",
      "asana",
      "ascon",
      "ascus",
      "asdic",
      "ashed",
      "ashes",
      "ashet",
      "asked",
      "asker",
      "askoi",
      "askos",
      "aspen",
      "asper",
      "aspic",
      "aspie",
      "aspis",
      "aspro",
      "assai",
      "assam",
      "asses",
      "assez",
      "assot",
      "aster",
      "astir",
      "astun",
      "asura",
      "asway",
      "aswim",
      "asyla",
      "ataps",
      "ataxy",
      "atigi",
      "atilt",
      "atimy",
      "atlas",
      "atman",
      "atmas",
      "atmos",
      "atocs",
      "atoke",
      "atoks",
      "atoms",
      "atomy",
      "atony",
      "atopy",
      "atria",
      "atrip",
      "attap",
      "attar",
      "atuas",
      "audad",
      "auger",
      "aught",
      "aulas",
      "aulic",
      "auloi",
      "aulos",
      "aumil",
      "aunes",
      "aunts",
      "aurae",
      "aural",
      "aurar",
      "auras",
      "aurei",
      "aures",
      "auric",
      "auris",
      "aurum",
      "autos",
      "auxin",
      "avale",
      "avant",
      "avast",
      "avels",
      "avens",
      "avers",
      "avgas",
      "avine",
      "avion",
      "avise",
      "aviso",
      "avize",
      "avows",
      "avyze",
      "awarn",
      "awato",
      "awave",
      "aways",
      "awdls",
      "aweel",
      "aweto",
      "awing",
      "awmry",
      "awned",
      "awner",
      "awols",
      "awork",
      "axels",
      "axile",
      "axils",
      "axing",
      "axite",
      "axled",
      "axles",
      "axman",
      "axmen",
      "axoid",
      "axone",
      "axons",
      "ayahs",
      "ayaya",
      "ayelp",
      "aygre",
      "ayins",
      "ayont",
      "ayres",
      "ayrie",
      "azans",
      "azide",
      "azido",
      "azine",
      "azlon",
      "azoic",
      "azole",
      "azons",
      "azote",
      "azoth",
      "azuki",
      "azurn",
      "azury",
      "azygy",
      "azyme",
      "azyms",
      "baaed",
      "baals",
      "babas",
      "babel",
      "babes",
      "babka",
      "baboo",
      "babul",
      "babus",
      "bacca",
      "bacco",
      "baccy",
      "bacha",
      "bachs",
      "backs",
      "baddy",
      "baels",
      "baffs",
      "baffy",
      "bafts",
      "baghs",
      "bagie",
      "bahts",
      "bahus",
      "bahut",
      "bails",
      "bairn",
      "baisa",
      "baith",
      "baits",
      "baiza",
      "baize",
      "bajan",
      "bajra",
      "bajri",
      "bajus",
      "baked",
      "baken",
      "bakes",
      "bakra",
      "balas",
      "balds",
      "baldy",
      "baled",
      "bales",
      "balks",
      "balky",
      "balls",
      "bally",
      "balms",
      "baloo",
      "balsa",
      "balti",
      "balun",
      "balus",
      "bambi",
      "banak",
      "banco",
      "bancs",
      "banda",
      "bandh",
      "bands",
      "bandy",
      "baned",
      "banes",
      "bangs",
      "bania",
      "banks",
      "banns",
      "bants",
      "bantu",
      "banty",
      "banya",
      "bapus",
      "barbe",
      "barbs",
      "barby",
      "barca",
      "barde",
      "bardo",
      "bards",
      "bardy",
      "bared",
      "barer",
      "bares",
      "barfi",
      "barfs",
      "baric",
      "barks",
      "barky",
      "barms",
      "barmy",
      "barns",
      "barny",
      "barps",
      "barra",
      "barre",
      "barro",
      "barry",
      "barye",
      "basan",
      "based",
      "basen",
      "baser",
      "bases",
      "basho",
      "basij",
      "basks",
      "bason",
      "basse",
      "bassi",
      "basso",
      "bassy",
      "basta",
      "basti",
      "basto",
      "basts",
      "bated",
      "bates",
      "baths",
      "batik",
      "batta",
      "batts",
      "battu",
      "bauds",
      "bauks",
      "baulk",
      "baurs",
      "bavin",
      "bawds",
      "bawks",
      "bawls",
      "bawns",
      "bawrs",
      "bawty",
      "bayed",
      "bayer",
      "bayes",
      "bayle",
      "bayts",
      "bazar",
      "bazoo",
      "beads",
      "beaks",
      "beaky",
      "beals",
      "beams",
      "beamy",
      "beano",
      "beans",
      "beany",
      "beare",
      "bears",
      "beath",
      "beats",
      "beaty",
      "beaus",
      "beaut",
      "beaux",
      "bebop",
      "becap",
      "becke",
      "becks",
      "bedad",
      "bedel",
      "bedes",
      "bedew",
      "bedim",
      "bedye",
      "beedi",
      "beefs",
      "beeps",
      "beers",
      "beery",
      "beets",
      "befog",
      "begad",
      "begar",
      "begem",
      "begot",
      "begum",
      "beige",
      "beigy",
      "beins",
      "bekah",
      "belah",
      "belar",
      "belay",
      "belee",
      "belga",
      "bells",
      "belon",
      "belts",
      "bemad",
      "bemas",
      "bemix",
      "bemud",
      "bends",
      "bendy",
      "benes",
      "benet",
      "benga",
      "benis",
      "benne",
      "benni",
      "benny",
      "bento",
      "bents",
      "benty",
      "bepat",
      "beray",
      "beres",
      "bergs",
      "berko",
      "berks",
      "berme",
      "berms",
      "berob",
      "beryl",
      "besat",
      "besaw",
      "besee",
      "beses",
      "besit",
      "besom",
      "besot",
      "besti",
      "bests",
      "betas",
      "beted",
      "betes",
      "beths",
      "betid",
      "beton",
      "betta",
      "betty",
      "bever",
      "bevor",
      "bevue",
      "bevvy",
      "bewet",
      "bewig",
      "bezes",
      "bezil",
      "bezzy",
      "bhais",
      "bhaji",
      "bhang",
      "bhats",
      "bhels",
      "bhoot",
      "bhuna",
      "bhuts",
      "biach",
      "biali",
      "bialy",
      "bibbs",
      "bibes",
      "biccy",
      "bices",
      "bided",
      "bider",
      "bides",
      "bidet",
      "bidis",
      "bidon",
      "bield",
      "biers",
      "biffo",
      "biffs",
      "biffy",
      "bifid",
      "bigae",
      "biggs",
      "biggy",
      "bigha",
      "bight",
      "bigly",
      "bigos",
      "bijou",
      "biked",
      "biker",
      "bikes",
      "bikie",
      "bilbo",
      "bilby",
      "biled",
      "biles",
      "bilgy",
      "bilks",
      "bills",
      "bimah",
      "bimas",
      "bimbo",
      "binal",
      "bindi",
      "binds",
      "biner",
      "bines",
      "bings",
      "bingy",
      "binit",
      "binks",
      "bints",
      "biogs",
      "biont",
      "biota",
      "biped",
      "bipod",
      "birds",
      "birks",
      "birle",
      "birls",
      "biros",
      "birrs",
      "birse",
      "birsy",
      "bises",
      "bisks",
      "bisom",
      "bitch",
      "biter",
      "bites",
      "bitos",
      "bitou",
      "bitsy",
      "bitte",
      "bitts",
      "bivia",
      "bivvy",
      "bizes",
      "bizzo",
      "bizzy",
      "blabs",
      "blads",
      "blady",
      "blaer",
      "blaes",
      "blaff",
      "blags",
      "blahs",
      "blain",
      "blams",
      "blart",
      "blase",
      "blash",
      "blate",
      "blats",
      "blatt",
      "blaud",
      "blawn",
      "blaws",
      "blays",
      "blear",
      "blebs",
      "blech",
      "blees",
      "blent",
      "blert",
      "blest",
      "blets",
      "bleys",
      "blimy",
      "bling",
      "blini",
      "blins",
      "bliny",
      "blips",
      "blist",
      "blite",
      "blits",
      "blive",
      "blobs",
      "blocs",
      "blogs",
      "blook",
      "bloop",
      "blore",
      "blots",
      "blows",
      "blowy",
      "blubs",
      "blude",
      "bluds",
      "bludy",
      "blued",
      "blues",
      "bluet",
      "bluey",
      "bluid",
      "blume",
      "blunk",
      "blurs",
      "blype",
      "boabs",
      "boaks",
      "boars",
      "boart",
      "boats",
      "bobac",
      "bobak",
      "bobas",
      "bobol",
      "bobos",
      "bocca",
      "bocce",
      "bocci",
      "boche",
      "bocks",
      "boded",
      "bodes",
      "bodge",
      "bodhi",
      "bodle",
      "boeps",
      "boets",
      "boeuf",
      "boffo",
      "boffs",
      "bogan",
      "bogey",
      "boggy",
      "bogie",
      "bogle",
      "bogue",
      "bogus",
      "bohea",
      "bohos",
      "boils",
      "boing",
      "boink",
      "boite",
      "boked",
      "bokeh",
      "bokes",
      "bokos",
      "bolar",
      "bolas",
      "bolds",
      "boles",
      "bolix",
      "bolls",
      "bolos",
      "bolts",
      "bolus",
      "bomas",
      "bombe",
      "bombo",
      "bombs",
      "bonce",
      "bonds",
      "boned",
      "boner",
      "bones",
      "bongs",
      "bonie",
      "bonks",
      "bonne",
      "bonny",
      "bonza",
      "bonze",
      "booai",
      "booay",
      "boobs",
      "boody",
      "booed",
      "boofy",
      "boogy",
      "boohs",
      "books",
      "booky",
      "bools",
      "booms",
      "boomy",
      "boong",
      "boons",
      "boord",
      "boors",
      "boose",
      "boots",
      "boppy",
      "borak",
      "boral",
      "boras",
      "borde",
      "bords",
      "bored",
      "boree",
      "borel",
      "borer",
      "bores",
      "borgo",
      "boric",
      "borks",
      "borms",
      "borna",
      "boron",
      "borts",
      "borty",
      "bortz",
      "bosie",
      "bosks",
      "bosky",
      "boson",
      "bosun",
      "botas",
      "botel",
      "botes",
      "bothy",
      "botte",
      "botts",
      "botty",
      "bouge",
      "bouks",
      "boult",
      "bouns",
      "bourd",
      "bourg",
      "bourn",
      "bouse",
      "bousy",
      "bouts",
      "bovid",
      "bowat",
      "bowed",
      "bower",
      "bowes",
      "bowet",
      "bowie",
      "bowls",
      "bowne",
      "bowrs",
      "bowse",
      "boxed",
      "boxen",
      "boxes",
      "boxla",
      "boxty",
      "boyar",
      "boyau",
      "boyed",
      "boyfs",
      "boygs",
      "boyla",
      "boyos",
      "boysy",
      "bozos",
      "braai",
      "brach",
      "brack",
      "bract",
      "brads",
      "braes",
      "brags",
      "brail",
      "braks",
      "braky",
      "brame",
      "brane",
      "brank",
      "brans",
      "brant",
      "brast",
      "brats",
      "brava",
      "bravi",
      "braws",
      "braxy",
      "brays",
      "braza",
      "braze",
      "bream",
      "brede",
      "breds",
      "breem",
      "breer",
      "brees",
      "breid",
      "breis",
      "breme",
      "brens",
      "brent",
      "brere",
      "brers",
      "breve",
      "brews",
      "breys",
      "brier",
      "bries",
      "brigs",
      "briki",
      "briks",
      "brill",
      "brims",
      "brins",
      "brios",
      "brise",
      "briss",
      "brith",
      "brits",
      "britt",
      "brize",
      "broch",
      "brock",
      "brods",
      "brogh",
      "brogs",
      "brome",
      "bromo",
      "bronc",
      "brond",
      "brool",
      "broos",
      "brose",
      "brosy",
      "brows",
      "brugh",
      "bruin",
      "bruit",
      "brule",
      "brume",
      "brung",
      "brusk",
      "brust",
      "bruts",
      "buats",
      "buaze",
      "bubal",
      "bubas",
      "bubba",
      "bubbe",
      "bubby",
      "bubus",
      "buchu",
      "bucko",
      "bucks",
      "bucku",
      "budas",
      "budis",
      "budos",
      "buffa",
      "buffe",
      "buffi",
      "buffo",
      "buffs",
      "buffy",
      "bufos",
      "bufty",
      "buhls",
      "buhrs",
      "buiks",
      "buist",
      "bukes",
      "bulbs",
      "bulgy",
      "bulks",
      "bulla",
      "bulls",
      "bulse",
      "bumbo",
      "bumfs",
      "bumph",
      "bumps",
      "bumpy",
      "bunas",
      "bunce",
      "bunco",
      "bunde",
      "bundh",
      "bunds",
      "bundt",
      "bundu",
      "bundy",
      "bungs",
      "bungy",
      "bunia",
      "bunje",
      "bunjy",
      "bunko",
      "bunks",
      "bunns",
      "bunts",
      "bunty",
      "bunya",
      "buoys",
      "buppy",
      "buran",
      "buras",
      "burbs",
      "burds",
      "buret",
      "burfi",
      "burgh",
      "burgs",
      "burin",
      "burka",
      "burke",
      "burks",
      "burls",
      "burns",
      "buroo",
      "burps",
      "burqa",
      "burro",
      "burrs",
      "burry",
      "bursa",
      "burse",
      "busby",
      "buses",
      "busks",
      "busky",
      "bussu",
      "busti",
      "busts",
      "busty",
      "buteo",
      "butes",
      "butle",
      "butoh",
      "butts",
      "butty",
      "butut",
      "butyl",
      "buzzy",
      "bwana",
      "bwazi",
      "byded",
      "bydes",
      "byked",
      "bykes",
      "byres",
      "byrls",
      "byssi",
      "bytes",
      "byway",
      "caaed",
      "cabas",
      "caber",
      "cabob",
      "caboc",
      "cabre",
      "cacas",
      "cacks",
      "cacky",
      "cadee",
      "cades",
      "cadge",
      "cadgy",
      "cadie",
      "cadis",
      "cadre",
      "caeca",
      "caese",
      "cafes",
      "caffs",
      "caged",
      "cager",
      "cages",
      "cagot",
      "cahow",
      "caids",
      "cains",
      "caird",
      "cajon",
      "cajun",
      "caked",
      "cakes",
      "cakey",
      "calfs",
      "calid",
      "calif",
      "calix",
      "calks",
      "calla",
      "calls",
      "calms",
      "calmy",
      "calos",
      "calpa",
      "calps",
      "calve",
      "calyx",
      "caman",
      "camas",
      "cames",
      "camis",
      "camos",
      "campi",
      "campo",
      "camps",
      "campy",
      "camus",
      "caned",
      "caneh",
      "caner",
      "canes",
      "cangs",
      "canid",
      "canna",
      "canns",
      "canso",
      "canst",
      "canto",
      "cants",
      "canty",
      "capas",
      "caped",
      "capes",
      "capex",
      "caphs",
      "capiz",
      "caple",
      "capon",
      "capos",
      "capot",
      "capri",
      "capul",
      "carap",
      "carbo",
      "carbs",
      "carby",
      "cardi",
      "cards",
      "cardy",
      "cared",
      "carer",
      "cares",
      "caret",
      "carex",
      "carks",
      "carle",
      "carls",
      "carns",
      "carny",
      "carob",
      "carom",
      "caron",
      "carpi",
      "carps",
      "carrs",
      "carse",
      "carta",
      "carte",
      "carts",
      "carvy",
      "casas",
      "casco",
      "cased",
      "cases",
      "casks",
      "casky",
      "casts",
      "casus",
      "cates",
      "cauda",
      "cauks",
      "cauld",
      "cauls",
      "caums",
      "caups",
      "cauri",
      "causa",
      "cavas",
      "caved",
      "cavel",
      "caver",
      "caves",
      "cavie",
      "cawed",
      "cawks",
      "caxon",
      "ceaze",
      "cebid",
      "cecal",
      "cecum",
      "ceded",
      "ceder",
      "cedes",
      "cedis",
      "ceiba",
      "ceili",
      "ceils",
      "celeb",
      "cella",
      "celli",
      "cells",
      "celom",
      "celts",
      "cense",
      "cento",
      "cents",
      "centu",
      "ceorl",
      "cepes",
      "cerci",
      "cered",
      "ceres",
      "cerge",
      "ceria",
      "ceric",
      "cerne",
      "ceroc",
      "ceros",
      "certs",
      "certy",
      "cesse",
      "cesta",
      "cesti",
      "cetes",
      "cetyl",
      "cezve",
      "chace",
      "chack",
      "chaco",
      "chado",
      "chads",
      "chaft",
      "chais",
      "chals",
      "chams",
      "chana",
      "chang",
      "chank",
      "chape",
      "chaps",
      "chapt",
      "chara",
      "chare",
      "chark",
      "charr",
      "chars",
      "chary",
      "chats",
      "chave",
      "chavs",
      "chawk",
      "chaws",
      "chaya",
      "chays",
      "cheep",
      "chefs",
      "cheka",
      "chela",
      "chelp",
      "chemo",
      "chems",
      "chere",
      "chert",
      "cheth",
      "chevy",
      "chews",
      "chewy",
      "chiao",
      "chias",
      "chibs",
      "chica",
      "chich",
      "chico",
      "chics",
      "chiel",
      "chiks",
      "chile",
      "chimb",
      "chimo",
      "chimp",
      "chine",
      "ching",
      "chink",
      "chino",
      "chins",
      "chips",
      "chirk",
      "chirl",
      "chirm",
      "chiro",
      "chirr",
      "chirt",
      "chiru",
      "chits",
      "chive",
      "chivs",
      "chivy",
      "chizz",
      "choco",
      "chocs",
      "chode",
      "chogs",
      "choil",
      "choko",
      "choky",
      "chola",
      "choli",
      "cholo",
      "chomp",
      "chons",
      "choof",
      "chook",
      "choom",
      "choon",
      "chops",
      "chota",
      "chott",
      "chout",
      "choux",
      "chowk",
      "chows",
      "chubs",
      "chufa",
      "chuff",
      "chugs",
      "chums",
      "churl",
      "churr",
      "chuse",
      "chuts",
      "chyle",
      "chyme",
      "chynd",
      "cibol",
      "cided",
      "cides",
      "ciels",
      "ciggy",
      "cilia",
      "cills",
      "cimar",
      "cimex",
      "cinct",
      "cines",
      "cinqs",
      "cions",
      "cippi",
      "circs",
      "cires",
      "cirls",
      "cirri",
      "cisco",
      "cissy",
      "cists",
      "cital",
      "cited",
      "citer",
      "cites",
      "cives",
      "civet",
      "civie",
      "civvy",
      "clach",
      "clade",
      "clads",
      "claes",
      "clags",
      "clame",
      "clams",
      "clans",
      "claps",
      "clapt",
      "claro",
      "clart",
      "clary",
      "clast",
      "clats",
      "claut",
      "clave",
      "clavi",
      "claws",
      "clays",
      "cleck",
      "cleek",
      "cleep",
      "clefs",
      "clegs",
      "cleik",
      "clems",
      "clepe",
      "clept",
      "cleve",
      "clews",
      "clied",
      "clies",
      "clift",
      "clime",
      "cline",
      "clint",
      "clipe",
      "clips",
      "clipt",
      "clits",
      "cloam",
      "clods",
      "cloff",
      "clogs",
      "cloke",
      "clomb",
      "clomp",
      "clonk",
      "clons",
      "cloop",
      "cloot",
      "clops",
      "clote",
      "clots",
      "clour",
      "clous",
      "clows",
      "cloye",
      "cloys",
      "cloze",
      "clubs",
      "clues",
      "cluey",
      "clunk",
      "clype",
      "cnida",
      "coact",
      "coady",
      "coala",
      "coals",
      "coaly",
      "coapt",
      "coarb",
      "coate",
      "coati",
      "coats",
      "cobbs",
      "cobby",
      "cobia",
      "coble",
      "cobza",
      "cocas",
      "cocci",
      "cocco",
      "cocks",
      "cocky",
      "cocos",
      "codas",
      "codec",
      "coded",
      "coden",
      "coder",
      "codes",
      "codex",
      "codon",
      "coeds",
      "coffs",
      "cogie",
      "cogon",
      "cogue",
      "cohab",
      "cohen",
      "cohoe",
      "cohog",
      "cohos",
      "coifs",
      "coign",
      "coils",
      "coins",
      "coirs",
      "coits",
      "coked",
      "cokes",
      "colas",
      "colby",
      "colds",
      "coled",
      "coles",
      "coley",
      "colic",
      "colin",
      "colls",
      "colly",
      "colog",
      "colts",
      "colza",
      "comae",
      "comal",
      "comas",
      "combe",
      "combi",
      "combo",
      "combs",
      "comby",
      "comer",
      "comes",
      "comix",
      "commo",
      "comms",
      "commy",
      "compo",
      "comps",
      "compt",
      "comte",
      "comus",
      "coned",
      "cones",
      "coney",
      "confs",
      "conga",
      "conge",
      "congo",
      "conia",
      "conin",
      "conks",
      "conky",
      "conne",
      "conns",
      "conte",
      "conto",
      "conus",
      "convo",
      "cooch",
      "cooed",
      "cooee",
      "cooer",
      "cooey",
      "coofs",
      "cooks",
      "cooky",
      "cools",
      "cooly",
      "coomb",
      "cooms",
      "coomy",
      "coons",
      "coops",
      "coopt",
      "coost",
      "coots",
      "cooze",
      "copal",
      "copay",
      "coped",
      "copen",
      "coper",
      "copes",
      "coppy",
      "copra",
      "copsy",
      "coqui",
      "coram",
      "corbe",
      "corby",
      "cords",
      "cored",
      "cores",
      "corey",
      "corgi",
      "coria",
      "corks",
      "corky",
      "corms",
      "corni",
      "corno",
      "corns",
      "cornu",
      "corps",
      "corse",
      "corso",
      "cosec",
      "cosed",
      "coses",
      "coset",
      "cosey",
      "cosie",
      "costa",
      "coste",
      "costs",
      "cotan",
      "coted",
      "cotes",
      "coths",
      "cotta",
      "cotts",
      "coude",
      "coups",
      "courb",
      "courd",
      "coure",
      "cours",
      "couta",
      "couth",
      "coved",
      "coves",
      "covin",
      "cowal",
      "cowan",
      "cowed",
      "cowks",
      "cowls",
      "cowps",
      "cowry",
      "coxae",
      "coxal",
      "coxed",
      "coxes",
      "coxib",
      "coyau",
      "coyed",
      "coyer",
      "coypu",
      "cozed",
      "cozen",
      "cozes",
      "cozey",
      "cozie",
      "craal",
      "crabs",
      "crags",
      "craic",
      "craig",
      "crake",
      "crame",
      "crams",
      "crans",
      "crape",
      "craps",
      "crapy",
      "crare",
      "craws",
      "crays",
      "creds",
      "creel",
      "crees",
      "crems",
      "crena",
      "creps",
      "crepy",
      "crewe",
      "crews",
      "crias",
      "cribs",
      "cries",
      "crims",
      "crine",
      "crios",
      "cripe",
      "crips",
      "crise",
      "crith",
      "crits",
      "croci",
      "crocs",
      "croft",
      "crogs",
      "cromb",
      "crome",
      "cronk",
      "crons",
      "crool",
      "croon",
      "crops",
      "crore",
      "crost",
      "crout",
      "crows",
      "croze",
      "cruck",
      "crudo",
      "cruds",
      "crudy",
      "crues",
      "cruet",
      "cruft",
      "crunk",
      "cruor",
      "crura",
      "cruse",
      "crusy",
      "cruve",
      "crwth",
      "cryer",
      "ctene",
      "cubby",
      "cubeb",
      "cubed",
      "cuber",
      "cubes",
      "cubit",
      "cuddy",
      "cuffo",
      "cuffs",
      "cuifs",
      "cuing",
      "cuish",
      "cuits",
      "cukes",
      "culch",
      "culet",
      "culex",
      "culls",
      "cully",
      "culms",
      "culpa",
      "culti",
      "cults",
      "culty",
      "cumec",
      "cundy",
      "cunei",
      "cunit",
      "cunts",
      "cupel",
      "cupid",
      "cuppa",
      "cuppy",
      "curat",
      "curbs",
      "curch",
      "curds",
      "curdy",
      "cured",
      "curer",
      "cures",
      "curet",
      "curfs",
      "curia",
      "curie",
      "curli",
      "curls",
      "curns",
      "curny",
      "currs",
      "cursi",
      "curst",
      "cusec",
      "cushy",
      "cusks",
      "cusps",
      "cuspy",
      "cusso",
      "cusum",
      "cutch",
      "cuter",
      "cutes",
      "cutey",
      "cutin",
      "cutis",
      "cutto",
      "cutty",
      "cutup",
      "cuvee",
      "cuzes",
      "cwtch",
      "cyano",
      "cyans",
      "cycad",
      "cycas",
      "cyclo",
      "cyder",
      "cylix",
      "cymae",
      "cymar",
      "cymas",
      "cymes",
      "cymol",
      "cysts",
      "cytes",
      "cyton",
      "czars",
      "daals",
      "dabba",
      "daces",
      "dacha",
      "dacks",
      "dadah",
      "dadas",
      "dados",
      "daffs",
      "daffy",
      "dagga",
      "daggy",
      "dagos",
      "dahls",
      "daiko",
      "daine",
      "daint",
      "daker",
      "daled",
      "dales",
      "dalis",
      "dalle",
      "dalts",
      "daman",
      "damar",
      "dames",
      "damme",
      "damns",
      "damps",
      "dampy",
      "dancy",
      "dangs",
      "danio",
      "danks",
      "danny",
      "dants",
      "daraf",
      "darbs",
      "darcy",
      "dared",
      "darer",
      "dares",
      "darga",
      "dargs",
      "daric",
      "daris",
      "darks",
      "darky",
      "darns",
      "darre",
      "darts",
      "darzi",
      "dashi",
      "dashy",
      "datal",
      "dated",
      "dater",
      "dates",
      "datos",
      "datto",
      "daube",
      "daubs",
      "dauby",
      "dauds",
      "dault",
      "daurs",
      "dauts",
      "daven",
      "davit",
      "dawah",
      "dawds",
      "dawed",
      "dawen",
      "dawks",
      "dawns",
      "dawts",
      "dayan",
      "daych",
      "daynt",
      "dazed",
      "dazer",
      "dazes",
      "deads",
      "deair",
      "deals",
      "deans",
      "deare",
      "dearn",
      "dears",
      "deary",
      "deash",
      "deave",
      "deaws",
      "deawy",
      "debag",
      "debby",
      "debel",
      "debes",
      "debts",
      "debud",
      "debur",
      "debus",
      "debye",
      "decad",
      "decaf",
      "decan",
      "decko",
      "decks",
      "decos",
      "dedal",
      "deeds",
      "deedy",
      "deely",
      "deems",
      "deens",
      "deeps",
      "deere",
      "deers",
      "deets",
      "deeve",
      "deevs",
      "defat",
      "deffo",
      "defis",
      "defog",
      "degas",
      "degum",
      "degus",
      "deice",
      "deids",
      "deify",
      "deils",
      "deism",
      "deist",
      "deked",
      "dekes",
      "dekko",
      "deled",
      "deles",
      "delfs",
      "delft",
      "delis",
      "dells",
      "delly",
      "delos",
      "delph",
      "delts",
      "deman",
      "demes",
      "demic",
      "demit",
      "demob",
      "demoi",
      "demos",
      "dempt",
      "denar",
      "denay",
      "dench",
      "denes",
      "denet",
      "denis",
      "dents",
      "deoxy",
      "derat",
      "deray",
      "dered",
      "deres",
      "derig",
      "derma",
      "derms",
      "derns",
      "derny",
      "deros",
      "derro",
      "derry",
      "derth",
      "dervs",
      "desex",
      "deshi",
      "desis",
      "desks",
      "desse",
      "devas",
      "devel",
      "devis",
      "devon",
      "devos",
      "devot",
      "dewan",
      "dewar",
      "dewax",
      "dewed",
      "dexes",
      "dexie",
      "dhaba",
      "dhaks",
      "dhals",
      "dhikr",
      "dhobi",
      "dhole",
      "dholl",
      "dhols",
      "dhoti",
      "dhows",
      "dhuti",
      "diact",
      "dials",
      "diane",
      "diazo",
      "dibbs",
      "diced",
      "dicer",
      "dices",
      "dicht",
      "dicks",
      "dicky",
      "dicot",
      "dicta",
      "dicts",
      "dicty",
      "diddy",
      "didie",
      "didos",
      "didst",
      "diebs",
      "diels",
      "diene",
      "diets",
      "diffs",
      "dight",
      "dikas",
      "diked",
      "diker",
      "dikes",
      "dikey",
      "dildo",
      "dilli",
      "dills",
      "dimbo",
      "dimer",
      "dimes",
      "dimps",
      "dinar",
      "dined",
      "dines",
      "dinge",
      "dings",
      "dinic",
      "dinks",
      "dinky",
      "dinna",
      "dinos",
      "dints",
      "diols",
      "diota",
      "dippy",
      "dipso",
      "diram",
      "direr",
      "dirke",
      "dirks",
      "dirls",
      "dirts",
      "disas",
      "disci",
      "discs",
      "dishy",
      "disks",
      "disme",
      "dital",
      "ditas",
      "dited",
      "dites",
      "ditsy",
      "ditts",
      "ditzy",
      "divan",
      "divas",
      "dived",
      "dives",
      "divis",
      "divna",
      "divos",
      "divot",
      "divvy",
      "diwan",
      "dixie",
      "dixit",
      "diyas",
      "dizen",
      "djinn",
      "djins",
      "doabs",
      "doats",
      "dobby",
      "dobes",
      "dobie",
      "dobla",
      "dobra",
      "dobro",
      "docht",
      "docks",
      "docos",
      "docus",
      "doddy",
      "dodos",
      "doeks",
      "doers",
      "doest",
      "doeth",
      "doffs",
      "dogan",
      "doges",
      "dogey",
      "doggo",
      "doggy",
      "dogie",
      "dohyo",
      "doilt",
      "doily",
      "doits",
      "dojos",
      "dolce",
      "dolci",
      "doled",
      "doles",
      "dolia",
      "dolls",
      "dolma",
      "dolor",
      "dolos",
      "dolts",
      "domal",
      "domed",
      "domes",
      "domic",
      "donah",
      "donas",
      "donee",
      "doner",
      "donga",
      "dongs",
      "donko",
      "donna",
      "donne",
      "donny",
      "donsy",
      "doobs",
      "dooce",
      "doody",
      "dooks",
      "doole",
      "dools",
      "dooly",
      "dooms",
      "doomy",
      "doona",
      "doorn",
      "doors",
      "doozy",
      "dopas",
      "doped",
      "doper",
      "dopes",
      "dorad",
      "dorba",
      "dorbs",
      "doree",
      "dores",
      "doric",
      "doris",
      "dorks",
      "dorky",
      "dorms",
      "dormy",
      "dorps",
      "dorrs",
      "dorsa",
      "dorse",
      "dorts",
      "dorty",
      "dosai",
      "dosas",
      "dosed",
      "doseh",
      "doser",
      "doses",
      "dosha",
      "dotal",
      "doted",
      "doter",
      "dotes",
      "dotty",
      "douar",
      "douce",
      "doucs",
      "douks",
      "doula",
      "douma",
      "doums",
      "doups",
      "doura",
      "douse",
      "douts",
      "doved",
      "doven",
      "dover",
      "doves",
      "dovie",
      "dowar",
      "dowds",
      "dowed",
      "dower",
      "dowie",
      "dowle",
      "dowls",
      "dowly",
      "downa",
      "downs",
      "dowps",
      "dowse",
      "dowts",
      "doxed",
      "doxes",
      "doxie",
      "doyen",
      "doyly",
      "dozed",
      "dozer",
      "dozes",
      "drabs",
      "drack",
      "draco",
      "draff",
      "drags",
      "drail",
      "drams",
      "drant",
      "draps",
      "drats",
      "drave",
      "draws",
      "drays",
      "drear",
      "dreck",
      "dreed",
      "dreer",
      "drees",
      "dregs",
      "dreks",
      "drent",
      "drere",
      "drest",
      "dreys",
      "dribs",
      "drice",
      "dries",
      "drily",
      "drips",
      "dript",
      "droid",
      "droil",
      "droke",
      "drole",
      "drome",
      "drony",
      "droob",
      "droog",
      "drook",
      "drops",
      "dropt",
      "drouk",
      "drows",
      "drubs",
      "drugs",
      "drums",
      "drupe",
      "druse",
      "drusy",
      "druxy",
      "dryad",
      "dryas",
      "dsobo",
      "dsomo",
      "duads",
      "duals",
      "duans",
      "duars",
      "dubbo",
      "ducal",
      "ducat",
      "duces",
      "ducks",
      "ducky",
      "ducts",
      "duddy",
      "duded",
      "dudes",
      "duels",
      "duets",
      "duett",
      "duffs",
      "dufus",
      "duing",
      "duits",
      "dukas",
      "duked",
      "dukes",
      "dukka",
      "dulce",
      "dules",
      "dulia",
      "dulls",
      "dulse",
      "dumas",
      "dumbo",
      "dumbs",
      "dumka",
      "dumky",
      "dumps",
      "dunam",
      "dunch",
      "dunes",
      "dungs",
      "dungy",
      "dunks",
      "dunno",
      "dunny",
      "dunsh",
      "dunts",
      "duomi",
      "duomo",
      "duped",
      "duper",
      "dupes",
      "duple",
      "duply",
      "duppy",
      "dural",
      "duras",
      "dured",
      "dures",
      "durgy",
      "durns",
      "duroc",
      "duros",
      "duroy",
      "durra",
      "durrs",
      "durry",
      "durst",
      "durum",
      "durzi",
      "dusks",
      "dusts",
      "duxes",
      "dwaal",
      "dwale",
      "dwalm",
      "dwams",
      "dwang",
      "dwaum",
      "dweeb",
      "dwile",
      "dwine",
      "dyads",
      "dyers",
      "dyked",
      "dykes",
      "dykey",
      "dykon",
      "dynel",
      "dynes",
      "dzhos",
      "eagre",
      "ealed",
      "eales",
      "eaned",
      "eards",
      "eared",
      "earls",
      "earns",
      "earnt",
      "earst",
      "eased",
      "easer",
      "eases",
      "easle",
      "easts",
      "eathe",
      "eaved",
      "eaves",
      "ebbed",
      "ebbet",
      "ebons",
      "ebook",
      "ecads",
      "eched",
      "eches",
      "echos",
      "ecrus",
      "edema",
      "edged",
      "edger",
      "edges",
      "edile",
      "edits",
      "educe",
      "educt",
      "eejit",
      "eensy",
      "eeven",
      "eevns",
      "effed",
      "egads",
      "egers",
      "egest",
      "eggar",
      "egged",
      "egger",
      "egmas",
      "ehing",
      "eider",
      "eidos",
      "eigne",
      "eiked",
      "eikon",
      "eilds",
      "eisel",
      "ejido",
      "ekkas",
      "elain",
      "eland",
      "elans",
      "elchi",
      "eldin",
      "elemi",
      "elfed",
      "eliad",
      "elint",
      "elmen",
      "eloge",
      "elogy",
      "eloin",
      "elops",
      "elpee",
      "elsin",
      "elute",
      "elvan",
      "elven",
      "elver",
      "elves",
      "emacs",
      "embar",
      "embay",
      "embog",
      "embow",
      "embox",
      "embus",
      "emeer",
      "emend",
      "emerg",
      "emery",
      "emeus",
      "emics",
      "emirs",
      "emits",
      "emmas",
      "emmer",
      "emmet",
      "emmew",
      "emmys",
      "emoji",
      "emong",
      "emote",
      "emove",
      "empts",
      "emule",
      "emure",
      "emyde",
      "emyds",
      "enarm",
      "enate",
      "ended",
      "ender",
      "endew",
      "endue",
      "enews",
      "enfix",
      "eniac",
      "enlit",
      "enmew",
      "ennog",
      "enoki",
      "enols",
      "enorm",
      "enows",
      "enrol",
      "ensew",
      "ensky",
      "entia",
      "enure",
      "enurn",
      "envoi",
      "enzym",
      "eorls",
      "eosin",
      "epact",
      "epees",
      "ephah",
      "ephas",
      "ephod",
      "ephor",
      "epics",
      "epode",
      "epopt",
      "epris",
      "eques",
      "equid",
      "erbia",
      "erevs",
      "ergon",
      "ergos",
      "ergot",
      "erhus",
      "erica",
      "erick",
      "erics",
      "ering",
      "erned",
      "ernes",
      "erose",
      "erred",
      "erses",
      "eruct",
      "erugo",
      "eruvs",
      "erven",
      "ervil",
      "escar",
      "escot",
      "esile",
      "eskar",
      "esker",
      "esnes",
      "esses",
      "estoc",
      "estop",
      "estro",
      "etage",
      "etape",
      "etats",
      "etens",
      "ethal",
      "ethne",
      "ethyl",
      "etics",
      "etnas",
      "ettin",
      "ettle",
      "etuis",
      "etwee",
      "etyma",
      "eughs",
      "euked",
      "eupad",
      "euros",
      "eusol",
      "evens",
      "evert",
      "evets",
      "evhoe",
      "evils",
      "evite",
      "evohe",
      "ewers",
      "ewest",
      "ewhow",
      "ewked",
      "exams",
      "exeat",
      "execs",
      "exeem",
      "exeme",
      "exfil",
      "exies",
      "exine",
      "exing",
      "exits",
      "exode",
      "exome",
      "exons",
      "expat",
      "expos",
      "exude",
      "exuls",
      "exurb",
      "eyass",
      "eyers",
      "eyots",
      "eyras",
      "eyres",
      "eyrie",
      "eyrir",
      "ezine",
      "fabby",
      "faced",
      "facer",
      "faces",
      "facia",
      "facta",
      "facts",
      "faddy",
      "faded",
      "fader",
      "fades",
      "fadge",
      "fados",
      "faena",
      "faery",
      "faffs",
      "faffy",
      "faggy",
      "fagin",
      "fagot",
      "faiks",
      "fails",
      "faine",
      "fains",
      "fairs",
      "faked",
      "faker",
      "fakes",
      "fakey",
      "fakie",
      "fakir",
      "falaj",
      "falls",
      "famed",
      "fames",
      "fanal",
      "fands",
      "fanes",
      "fanga",
      "fango",
      "fangs",
      "fanks",
      "fanon",
      "fanos",
      "fanum",
      "faqir",
      "farad",
      "farci",
      "farcy",
      "fards",
      "fared",
      "farer",
      "fares",
      "farle",
      "farls",
      "farms",
      "faros",
      "farro",
      "farse",
      "farts",
      "fasci",
      "fasti",
      "fasts",
      "fated",
      "fates",
      "fatly",
      "fatso",
      "fatwa",
      "faugh",
      "fauld",
      "fauns",
      "faurd",
      "fauts",
      "fauve",
      "favas",
      "favel",
      "faver",
      "faves",
      "favus",
      "fawns",
      "fawny",
      "faxed",
      "faxes",
      "fayed",
      "fayer",
      "fayne",
      "fayre",
      "fazed",
      "fazes",
      "feals",
      "feare",
      "fears",
      "feart",
      "fease",
      "feats",
      "feaze",
      "feces",
      "fecht",
      "fecit",
      "fecks",
      "fedex",
      "feebs",
      "feeds",
      "feels",
      "feens",
      "feers",
      "feese",
      "feeze",
      "fehme",
      "feint",
      "feist",
      "felch",
      "felid",
      "fells",
      "felly",
      "felts",
      "felty",
      "femal",
      "femes",
      "femmy",
      "fends",
      "fendy",
      "fenis",
      "fenks",
      "fenny",
      "fents",
      "feods",
      "feoff",
      "ferer",
      "feres",
      "feria",
      "ferly",
      "fermi",
      "ferms",
      "ferns",
      "ferny",
      "fesse",
      "festa",
      "fests",
      "festy",
      "fetas",
      "feted",
      "fetes",
      "fetor",
      "fetta",
      "fetts",
      "fetwa",
      "feuar",
      "feuds",
      "feued",
      "feyed",
      "feyer",
      "feyly",
      "fezes",
      "fezzy",
      "fiars",
      "fiats",
      "fibro",
      "fices",
      "fiche",
      "fichu",
      "ficin",
      "ficos",
      "fides",
      "fidge",
      "fidos",
      "fiefs",
      "fient",
      "fiere",
      "fiers",
      "fiest",
      "fifed",
      "fifer",
      "fifes",
      "fifis",
      "figgy",
      "figos",
      "fiked",
      "fikes",
      "filar",
      "filch",
      "filed",
      "files",
      "filii",
      "filks",
      "fille",
      "fillo",
      "fills",
      "filmi",
      "films",
      "filos",
      "filum",
      "finca",
      "finds",
      "fined",
      "fines",
      "finis",
      "finks",
      "finny",
      "finos",
      "fiord",
      "fiqhs",
      "fique",
      "fired",
      "firer",
      "fires",
      "firie",
      "firks",
      "firms",
      "firns",
      "firry",
      "firth",
      "fiscs",
      "fisks",
      "fists",
      "fisty",
      "fitch",
      "fitly",
      "fitna",
      "fitte",
      "fitts",
      "fiver",
      "fives",
      "fixed",
      "fixes",
      "fixit",
      "fjeld",
      "flabs",
      "flaff",
      "flags",
      "flaks",
      "flamm",
      "flams",
      "flamy",
      "flane",
      "flans",
      "flaps",
      "flary",
      "flats",
      "flava",
      "flawn",
      "flaws",
      "flawy",
      "flaxy",
      "flays",
      "fleam",
      "fleas",
      "fleek",
      "fleer",
      "flees",
      "flegs",
      "fleme",
      "fleur",
      "flews",
      "flexi",
      "flexo",
      "fleys",
      "flics",
      "flied",
      "flies",
      "flimp",
      "flims",
      "flips",
      "flirs",
      "flisk",
      "flite",
      "flits",
      "flitt",
      "flobs",
      "flocs",
      "floes",
      "flogs",
      "flong",
      "flops",
      "flors",
      "flory",
      "flosh",
      "flota",
      "flote",
      "flows",
      "flubs",
      "flued",
      "flues",
      "fluey",
      "fluky",
      "flump",
      "fluor",
      "flurr",
      "fluty",
      "fluyt",
      "flyby",
      "flype",
      "flyte",
      "foals",
      "foams",
      "foehn",
      "fogey",
      "fogie",
      "fogle",
      "fogou",
      "fohns",
      "foids",
      "foils",
      "foins",
      "folds",
      "foley",
      "folia",
      "folic",
      "folie",
      "folks",
      "folky",
      "fomes",
      "fonda",
      "fonds",
      "fondu",
      "fones",
      "fonly",
      "fonts",
      "foods",
      "foody",
      "fools",
      "foots",
      "footy",
      "foram",
      "forbs",
      "forby",
      "fordo",
      "fords",
      "forel",
      "fores",
      "forex",
      "forks",
      "forky",
      "forme",
      "forms",
      "forts",
      "forza",
      "forze",
      "fossa",
      "fosse",
      "fouat",
      "fouds",
      "fouer",
      "fouet",
      "foule",
      "fouls",
      "fount",
      "fours",
      "fouth",
      "fovea",
      "fowls",
      "fowth",
      "foxed",
      "foxes",
      "foxie",
      "foyle",
      "foyne",
      "frabs",
      "frack",
      "fract",
      "frags",
      "fraim",
      "franc",
      "frape",
      "fraps",
      "frass",
      "frate",
      "frati",
      "frats",
      "fraus",
      "frays",
      "frees",
      "freet",
      "freit",
      "fremd",
      "frena",
      "freon",
      "frere",
      "frets",
      "fribs",
      "frier",
      "fries",
      "frigs",
      "frise",
      "frist",
      "frith",
      "frits",
      "fritt",
      "frize",
      "frizz",
      "froes",
      "frogs",
      "frons",
      "frore",
      "frorn",
      "frory",
      "frosh",
      "frows",
      "frowy",
      "frugs",
      "frump",
      "frush",
      "frust",
      "fryer",
      "fubar",
      "fubby",
      "fubsy",
      "fucks",
      "fucus",
      "fuddy",
      "fudgy",
      "fuels",
      "fuero",
      "fuffs",
      "fuffy",
      "fugal",
      "fuggy",
      "fugie",
      "fugio",
      "fugle",
      "fugly",
      "fugus",
      "fujis",
      "fulls",
      "fumed",
      "fumer",
      "fumes",
      "fumet",
      "fundi",
      "funds",
      "fundy",
      "fungo",
      "fungs",
      "funks",
      "fural",
      "furan",
      "furca",
      "furls",
      "furol",
      "furrs",
      "furth",
      "furze",
      "furzy",
      "fused",
      "fusee",
      "fusel",
      "fuses",
      "fusil",
      "fusks",
      "fusts",
      "fusty",
      "futon",
      "fuzed",
      "fuzee",
      "fuzes",
      "fuzil",
      "fyces",
      "fyked",
      "fykes",
      "fyles",
      "fyrds",
      "fytte",
      "gabba",
      "gabby",
      "gable",
      "gaddi",
      "gades",
      "gadge",
      "gadid",
      "gadis",
      "gadje",
      "gadjo",
      "gadso",
      "gaffs",
      "gaged",
      "gager",
      "gages",
      "gaids",
      "gains",
      "gairs",
      "gaita",
      "gaits",
      "gaitt",
      "gajos",
      "galah",
      "galas",
      "galax",
      "galea",
      "galed",
      "gales",
      "galls",
      "gally",
      "galop",
      "galut",
      "galvo",
      "gamas",
      "gamay",
      "gamba",
      "gambe",
      "gambo",
      "gambs",
      "gamed",
      "games",
      "gamey",
      "gamic",
      "gamin",
      "gamme",
      "gammy",
      "gamps",
      "ganch",
      "gandy",
      "ganef",
      "ganev",
      "gangs",
      "ganja",
      "ganof",
      "gants",
      "gaols",
      "gaped",
      "gaper",
      "gapes",
      "gapos",
      "gappy",
      "garbe",
      "garbo",
      "garbs",
      "garda",
      "gares",
      "garis",
      "garms",
      "garni",
      "garre",
      "garth",
      "garum",
      "gases",
      "gasps",
      "gaspy",
      "gasts",
      "gatch",
      "gated",
      "gater",
      "gates",
      "gaths",
      "gator",
      "gauch",
      "gaucy",
      "gauds",
      "gauje",
      "gault",
      "gaums",
      "gaumy",
      "gaups",
      "gaurs",
      "gauss",
      "gauzy",
      "gavot",
      "gawcy",
      "gawds",
      "gawks",
      "gawps",
      "gawsy",
      "gayal",
      "gazal",
      "gazar",
      "gazed",
      "gazes",
      "gazon",
      "gazoo",
      "geals",
      "geans",
      "geare",
      "gears",
      "geats",
      "gebur",
      "gecks",
      "geeks",
      "geeps",
      "geest",
      "geist",
      "geits",
      "gelds",
      "gelee",
      "gelid",
      "gelly",
      "gelts",
      "gemel",
      "gemma",
      "gemmy",
      "gemot",
      "genal",
      "genas",
      "genes",
      "genet",
      "genic",
      "genii",
      "genip",
      "genny",
      "genoa",
      "genom",
      "genro",
      "gents",
      "genty",
      "genua",
      "genus",
      "geode",
      "geoid",
      "gerah",
      "gerbe",
      "geres",
      "gerle",
      "germs",
      "germy",
      "gerne",
      "gesse",
      "gesso",
      "geste",
      "gests",
      "getas",
      "getup",
      "geums",
      "geyan",
      "geyer",
      "ghast",
      "ghats",
      "ghaut",
      "ghazi",
      "ghees",
      "ghest",
      "ghyll",
      "gibed",
      "gibel",
      "giber",
      "gibes",
      "gibli",
      "gibus",
      "gifts",
      "gigas",
      "gighe",
      "gigot",
      "gigue",
      "gilas",
      "gilds",
      "gilet",
      "gills",
      "gilly",
      "gilpy",
      "gilts",
      "gimel",
      "gimme",
      "gimps",
      "gimpy",
      "ginch",
      "ginge",
      "gings",
      "ginks",
      "ginny",
      "ginzo",
      "gipon",
      "gippo",
      "gippy",
      "girds",
      "girls",
      "girns",
      "giron",
      "giros",
      "girrs",
      "girsh",
      "girts",
      "gismo",
      "gisms",
      "gists",
      "gitch",
      "gites",
      "giust",
      "gived",
      "gives",
      "gizmo",
      "glace",
      "glads",
      "glady",
      "glaik",
      "glair",
      "glams",
      "glans",
      "glary",
      "glaum",
      "glaur",
      "glazy",
      "gleba",
      "glebe",
      "gleby",
      "glede",
      "gleds",
      "gleed",
      "gleek",
      "glees",
      "gleet",
      "gleis",
      "glens",
      "glent",
      "gleys",
      "glial",
      "glias",
      "glibs",
      "gliff",
      "glift",
      "glike",
      "glime",
      "glims",
      "glisk",
      "glits",
      "glitz",
      "gloam",
      "globi",
      "globs",
      "globy",
      "glode",
      "glogg",
      "gloms",
      "gloop",
      "glops",
      "glost",
      "glout",
      "glows",
      "gloze",
      "glued",
      "gluer",
      "glues",
      "gluey",
      "glugs",
      "glume",
      "glums",
      "gluon",
      "glute",
      "gluts",
      "gnarl",
      "gnarr",
      "gnars",
      "gnats",
      "gnawn",
      "gnaws",
      "gnows",
      "goads",
      "goafs",
      "goals",
      "goary",
      "goats",
      "goaty",
      "goban",
      "gobar",
      "gobbi",
      "gobbo",
      "gobby",
      "gobis",
      "gobos",
      "godet",
      "godso",
      "goels",
      "goers",
      "goest",
      "goeth",
      "goety",
      "gofer",
      "goffs",
      "gogga",
      "gogos",
      "goier",
      "gojis",
      "golds",
      "goldy",
      "goles",
      "golfs",
      "golpe",
      "golps",
      "gombo",
      "gomer",
      "gompa",
      "gonch",
      "gonef",
      "gongs",
      "gonia",
      "gonif",
      "gonks",
      "gonna",
      "gonof",
      "gonys",
      "gonzo",
      "gooby",
      "goods",
      "goofs",
      "googs",
      "gooks",
      "gooky",
      "goold",
      "gools",
      "gooly",
      "goons",
      "goony",
      "goops",
      "goopy",
      "goors",
      "goory",
      "goosy",
      "gopak",
      "gopik",
      "goral",
      "goras",
      "gored",
      "gores",
      "goris",
      "gorms",
      "gormy",
      "gorps",
      "gorse",
      "gorsy",
      "gosht",
      "gosse",
      "gotch",
      "goths",
      "gothy",
      "gotta",
      "gouch",
      "gouks",
      "goura",
      "gouts",
      "gouty",
      "gowan",
      "gowds",
      "gowfs",
      "gowks",
      "gowls",
      "gowns",
      "goxes",
      "goyim",
      "goyle",
      "graal",
      "grabs",
      "grads",
      "graff",
      "graip",
      "grama",
      "grame",
      "gramp",
      "grams",
      "grana",
      "grans",
      "grapy",
      "gravs",
      "grays",
      "grebe",
      "grebo",
      "grece",
      "greek",
      "grees",
      "grege",
      "grego",
      "grein",
      "grens",
      "grese",
      "greve",
      "grews",
      "greys",
      "grice",
      "gride",
      "grids",
      "griff",
      "grift",
      "grigs",
      "grike",
      "grins",
      "griot",
      "grips",
      "gript",
      "gripy",
      "grise",
      "grist",
      "grisy",
      "grith",
      "grits",
      "grize",
      "groat",
      "grody",
      "grogs",
      "groks",
      "groma",
      "grone",
      "groof",
      "grosz",
      "grots",
      "grouf",
      "grovy",
      "grows",
      "grrls",
      "grrrl",
      "grubs",
      "grued",
      "grues",
      "grufe",
      "grume",
      "grump",
      "grund",
      "gryce",
      "gryde",
      "gryke",
      "grype",
      "grypt",
      "guaco",
      "guana",
      "guano",
      "guans",
      "guars",
      "gucks",
      "gucky",
      "gudes",
      "guffs",
      "gugas",
      "guids",
      "guimp",
      "guiro",
      "gulag",
      "gular",
      "gulas",
      "gules",
      "gulet",
      "gulfs",
      "gulfy",
      "gulls",
      "gulph",
      "gulps",
      "gulpy",
      "gumma",
      "gummi",
      "gumps",
      "gundy",
      "gunge",
      "gungy",
      "gunks",
      "gunky",
      "gunny",
      "guqin",
      "gurdy",
      "gurge",
      "gurls",
      "gurly",
      "gurns",
      "gurry",
      "gursh",
      "gurus",
      "gushy",
      "gusla",
      "gusle",
      "gusli",
      "gussy",
      "gusts",
      "gutsy",
      "gutta",
      "gutty",
      "guyed",
      "guyle",
      "guyot",
      "guyse",
      "gwine",
      "gyals",
      "gyans",
      "gybed",
      "gybes",
      "gyeld",
      "gymps",
      "gynae",
      "gynie",
      "gynny",
      "gynos",
      "gyoza",
      "gypos",
      "gyppo",
      "gyppy",
      "gyral",
      "gyred",
      "gyres",
      "gyron",
      "gyros",
      "gyrus",
      "gytes",
      "gyved",
      "gyves",
      "haafs",
      "haars",
      "hable",
      "habus",
      "hacek",
      "hacks",
      "hadal",
      "haded",
      "hades",
      "hadji",
      "hadst",
      "haems",
      "haets",
      "haffs",
      "hafiz",
      "hafts",
      "haggs",
      "hahas",
      "haick",
      "haika",
      "haiks",
      "haiku",
      "hails",
      "haily",
      "hains",
      "haint",
      "hairs",
      "haith",
      "hajes",
      "hajis",
      "hajji",
      "hakam",
      "hakas",
      "hakea",
      "hakes",
      "hakim",
      "hakus",
      "halal",
      "haled",
      "haler",
      "hales",
      "halfa",
      "halfs",
      "halid",
      "hallo",
      "halls",
      "halma",
      "halms",
      "halon",
      "halos",
      "halse",
      "halts",
      "halva",
      "halwa",
      "hamal",
      "hamba",
      "hamed",
      "hames",
      "hammy",
      "hamza",
      "hanap",
      "hance",
      "hanch",
      "hands",
      "hangi",
      "hangs",
      "hanks",
      "hanky",
      "hansa",
      "hanse",
      "hants",
      "haole",
      "haoma",
      "hapax",
      "haply",
      "happi",
      "hapus",
      "haram",
      "hards",
      "hared",
      "hares",
      "harim",
      "harks",
      "harls",
      "harms",
      "harns",
      "haros",
      "harps",
      "harts",
      "hashy",
      "hasks",
      "hasps",
      "hasta",
      "hated",
      "hates",
      "hatha",
      "hauds",
      "haufs",
      "haugh",
      "hauld",
      "haulm",
      "hauls",
      "hault",
      "hauns",
      "hause",
      "haver",
      "haves",
      "hawed",
      "hawks",
      "hawms",
      "hawse",
      "hayed",
      "hayer",
      "hayey",
      "hayle",
      "hazan",
      "hazed",
      "hazer",
      "hazes",
      "heads",
      "heald",
      "heals",
      "heame",
      "heaps",
      "heapy",
      "heare",
      "hears",
      "heast",
      "heats",
      "heben",
      "hebes",
      "hecht",
      "hecks",
      "heder",
      "hedgy",
      "heeds",
      "heedy",
      "heels",
      "heeze",
      "hefte",
      "hefts",
      "heids",
      "heigh",
      "heils",
      "heirs",
      "hejab",
      "hejra",
      "heled",
      "heles",
      "helio",
      "hells",
      "helms",
      "helos",
      "helot",
      "helps",
      "helve",
      "hemal",
      "hemes",
      "hemic",
      "hemin",
      "hemps",
      "hempy",
      "hench",
      "hends",
      "henge",
      "henna",
      "henny",
      "henry",
      "hents",
      "hepar",
      "herbs",
      "herby",
      "herds",
      "heres",
      "herls",
      "herma",
      "herms",
      "herns",
      "heros",
      "herry",
      "herse",
      "hertz",
      "herye",
      "hesps",
      "hests",
      "hetes",
      "heths",
      "heuch",
      "heugh",
      "hevea",
      "hewed",
      "hewer",
      "hewgh",
      "hexad",
      "hexed",
      "hexer",
      "hexes",
      "hexyl",
      "heyed",
      "hiant",
      "hicks",
      "hided",
      "hider",
      "hides",
      "hiems",
      "highs",
      "hight",
      "hijab",
      "hijra",
      "hiked",
      "hiker",
      "hikes",
      "hikoi",
      "hilar",
      "hilch",
      "hillo",
      "hills",
      "hilts",
      "hilum",
      "hilus",
      "himbo",
      "hinau",
      "hinds",
      "hings",
      "hinky",
      "hinny",
      "hints",
      "hiois",
      "hiply",
      "hired",
      "hiree",
      "hirer",
      "hires",
      "hissy",
      "hists",
      "hithe",
      "hived",
      "hiver",
      "hives",
      "hizen",
      "hoaed",
      "hoagy",
      "hoars",
      "hoary",
      "hoast",
      "hobos",
      "hocks",
      "hocus",
      "hodad",
      "hodja",
      "hoers",
      "hogan",
      "hogen",
      "hoggs",
      "hoghs",
      "hohed",
      "hoick",
      "hoied",
      "hoiks",
      "hoing",
      "hoise",
      "hokas",
      "hoked",
      "hokes",
      "hokey",
      "hokis",
      "hokku",
      "hokum",
      "holds",
      "holed",
      "holes",
      "holey",
      "holks",
      "holla",
      "hollo",
      "holme",
      "holms",
      "holon",
      "holos",
      "holts",
      "homas",
      "homed",
      "homes",
      "homey",
      "homie",
      "homme",
      "homos",
      "honan",
      "honda",
      "honds",
      "honed",
      "honer",
      "hones",
      "hongi",
      "hongs",
      "honks",
      "honky",
      "hooch",
      "hoods",
      "hoody",
      "hooey",
      "hoofs",
      "hooka",
      "hooks",
      "hooky",
      "hooly",
      "hoons",
      "hoops",
      "hoord",
      "hoors",
      "hoosh",
      "hoots",
      "hooty",
      "hoove",
      "hopak",
      "hoped",
      "hoper",
      "hopes",
      "hoppy",
      "horah",
      "horal",
      "horas",
      "horis",
      "horks",
      "horme",
      "horns",
      "horst",
      "horsy",
      "hosed",
      "hosel",
      "hosen",
      "hoser",
      "hoses",
      "hosey",
      "hosta",
      "hosts",
      "hotch",
      "hoten",
      "hotty",
      "houff",
      "houfs",
      "hough",
      "houri",
      "hours",
      "houts",
      "hovea",
      "hoved",
      "hoven",
      "hoves",
      "howbe",
      "howes",
      "howff",
      "howfs",
      "howks",
      "howls",
      "howre",
      "howso",
      "hoxed",
      "hoxes",
      "hoyas",
      "hoyed",
      "hoyle",
      "hubby",
      "hucks",
      "hudna",
      "hudud",
      "huers",
      "huffs",
      "huffy",
      "huger",
      "huggy",
      "huhus",
      "huias",
      "hulas",
      "hules",
      "hulks",
      "hulky",
      "hullo",
      "hulls",
      "hully",
      "humas",
      "humfs",
      "humic",
      "humps",
      "humpy",
      "hunks",
      "hunts",
      "hurds",
      "hurls",
      "hurly",
      "hurra",
      "hurst",
      "hurts",
      "hushy",
      "husks",
      "husos",
      "hutia",
      "huzza",
      "huzzy",
      "hwyls",
      "hydra",
      "hyens",
      "hygge",
      "hying",
      "hykes",
      "hylas",
      "hyleg",
      "hyles",
      "hylic",
      "hymns",
      "hynde",
      "hyoid",
      "hyped",
      "hypes",
      "hypha",
      "hyphy",
      "hypos",
      "hyrax",
      "hyson",
      "hythe",
      "iambi",
      "iambs",
      "ibrik",
      "icers",
      "iched",
      "iches",
      "ichor",
      "icier",
      "icker",
      "ickle",
      "icons",
      "ictal",
      "ictic",
      "ictus",
      "idant",
      "ideas",
      "idees",
      "ident",
      "idled",
      "idles",
      "idola",
      "idols",
      "idyls",
      "iftar",
      "igapo",
      "igged",
      "iglus",
      "ihram",
      "ikans",
      "ikats",
      "ikons",
      "ileac",
      "ileal",
      "ileum",
      "ileus",
      "iliad",
      "ilial",
      "ilium",
      "iller",
      "illth",
      "imago",
      "imams",
      "imari",
      "imaum",
      "imbar",
      "imbed",
      "imide",
      "imido",
      "imids",
      "imine",
      "imino",
      "immew",
      "immit",
      "immix",
      "imped",
      "impis",
      "impot",
      "impro",
      "imshi",
      "imshy",
      "inapt",
      "inarm",
      "inbye",
      "incel",
      "incle",
      "incog",
      "incus",
      "incut",
      "indew",
      "india",
      "indie",
      "indol",
      "indow",
      "indri",
      "indue",
      "inerm",
      "infix",
      "infos",
      "infra",
      "ingan",
      "ingle",
      "inion",
      "inked",
      "inker",
      "inkle",
      "inned",
      "innit",
      "inorb",
      "inrun",
      "inset",
      "inspo",
      "intel",
      "intil",
      "intis",
      "intra",
      "inula",
      "inure",
      "inurn",
      "inust",
      "invar",
      "inwit",
      "iodic",
      "iodid",
      "iodin",
      "iotas",
      "ippon",
      "irade",
      "irids",
      "iring",
      "irked",
      "iroko",
      "irone",
      "irons",
      "isbas",
      "ishes",
      "isled",
      "isles",
      "isnae",
      "issei",
      "istle",
      "items",
      "ither",
      "ivied",
      "ivies",
      "ixias",
      "ixnay",
      "ixora",
      "ixtle",
      "izard",
      "izars",
      "izzat",
      "jaaps",
      "jabot",
      "jacal",
      "jacks",
      "jacky",
      "jaded",
      "jades",
      "jafas",
      "jaffa",
      "jagas",
      "jager",
      "jaggs",
      "jaggy",
      "jagir",
      "jagra",
      "jails",
      "jaker",
      "jakes",
      "jakey",
      "jalap",
      "jalop",
      "jambe",
      "jambo",
      "jambs",
      "jambu",
      "james",
      "jammy",
      "jamon",
      "janes",
      "janns",
      "janny",
      "janty",
      "japan",
      "japed",
      "japer",
      "japes",
      "jarks",
      "jarls",
      "jarps",
      "jarta",
      "jarul",
      "jasey",
      "jaspe",
      "jasps",
      "jatos",
      "jauks",
      "jaups",
      "javas",
      "javel",
      "jawan",
      "jawed",
      "jaxie",
      "jeans",
      "jeats",
      "jebel",
      "jedis",
      "jeels",
      "jeely",
      "jeeps",
      "jeers",
      "jeeze",
      "jefes",
      "jeffs",
      "jehad",
      "jehus",
      "jelab",
      "jello",
      "jells",
      "jembe",
      "jemmy",
      "jenny",
      "jeons",
      "jerid",
      "jerks",
      "jerry",
      "jesse",
      "jests",
      "jesus",
      "jetes",
      "jeton",
      "jeune",
      "jewed",
      "jewie",
      "jhala",
      "jiaos",
      "jibba",
      "jibbs",
      "jibed",
      "jiber",
      "jibes",
      "jiffs",
      "jiggy",
      "jigot",
      "jihad",
      "jills",
      "jilts",
      "jimmy",
      "jimpy",
      "jingo",
      "jinks",
      "jinne",
      "jinni",
      "jinns",
      "jirds",
      "jirga",
      "jirre",
      "jisms",
      "jived",
      "jiver",
      "jives",
      "jivey",
      "jnana",
      "jobed",
      "jobes",
      "jocko",
      "jocks",
      "jocky",
      "jocos",
      "jodel",
      "joeys",
      "johns",
      "joins",
      "joked",
      "jokes",
      "jokey",
      "jokol",
      "joled",
      "joles",
      "jolls",
      "jolts",
      "jolty",
      "jomon",
      "jomos",
      "jones",
      "jongs",
      "jonty",
      "jooks",
      "joram",
      "jorum",
      "jotas",
      "jotty",
      "jotun",
      "joual",
      "jougs",
      "jouks",
      "joule",
      "jours",
      "jowar",
      "jowed",
      "jowls",
      "jowly",
      "joyed",
      "jubas",
      "jubes",
      "jucos",
      "judas",
      "judgy",
      "judos",
      "jugal",
      "jugum",
      "jujus",
      "juked",
      "jukes",
      "jukus",
      "julep",
      "jumar",
      "jumby",
      "jumps",
      "junco",
      "junks",
      "junky",
      "jupes",
      "jupon",
      "jural",
      "jurat",
      "jurel",
      "jures",
      "justs",
      "jutes",
      "jutty",
      "juves",
      "juvie",
      "kaama",
      "kabab",
      "kabar",
      "kabob",
      "kacha",
      "kacks",
      "kadai",
      "kades",
      "kadis",
      "kafir",
      "kagos",
      "kagus",
      "kahal",
      "kaiak",
      "kaids",
      "kaies",
      "kaifs",
      "kaika",
      "kaiks",
      "kails",
      "kaims",
      "kaing",
      "kains",
      "kakas",
      "kakis",
      "kalam",
      "kales",
      "kalif",
      "kalis",
      "kalpa",
      "kamas",
      "kames",
      "kamik",
      "kamis",
      "kamme",
      "kanae",
      "kanas",
      "kandy",
      "kaneh",
      "kanes",
      "kanga",
      "kangs",
      "kanji",
      "kants",
      "kanzu",
      "kaons",
      "kapas",
      "kaphs",
      "kapok",
      "kapow",
      "kapus",
      "kaput",
      "karas",
      "karat",
      "karks",
      "karns",
      "karoo",
      "karos",
      "karri",
      "karst",
      "karsy",
      "karts",
      "karzy",
      "kasha",
      "kasme",
      "katal",
      "katas",
      "katis",
      "katti",
      "kaugh",
      "kauri",
      "kauru",
      "kaury",
      "kaval",
      "kavas",
      "kawas",
      "kawau",
      "kawed",
      "kayle",
      "kayos",
      "kazis",
      "kazoo",
      "kbars",
      "kebar",
      "kebob",
      "kecks",
      "kedge",
      "kedgy",
      "keech",
      "keefs",
      "keeks",
      "keels",
      "keema",
      "keeno",
      "keens",
      "keeps",
      "keets",
      "keeve",
      "kefir",
      "kehua",
      "keirs",
      "kelep",
      "kelim",
      "kells",
      "kelly",
      "kelps",
      "kelpy",
      "kelts",
      "kelty",
      "kembo",
      "kembs",
      "kemps",
      "kempt",
      "kempy",
      "kenaf",
      "kench",
      "kendo",
      "kenos",
      "kente",
      "kents",
      "kepis",
      "kerbs",
      "kerel",
      "kerfs",
      "kerky",
      "kerma",
      "kerne",
      "kerns",
      "keros",
      "kerry",
      "kerve",
      "kesar",
      "kests",
      "ketas",
      "ketch",
      "ketes",
      "ketol",
      "kevel",
      "kevil",
      "kexes",
      "keyed",
      "keyer",
      "khadi",
      "khafs",
      "khans",
      "khaph",
      "khats",
      "khaya",
      "khazi",
      "kheda",
      "kheth",
      "khets",
      "khoja",
      "khors",
      "khoum",
      "khuds",
      "kiaat",
      "kiack",
      "kiang",
      "kibbe",
      "kibbi",
      "kibei",
      "kibes",
      "kibla",
      "kicks",
      "kicky",
      "kiddo",
      "kiddy",
      "kidel",
      "kidge",
      "kiefs",
      "kiers",
      "kieve",
      "kievs",
      "kight",
      "kikes",
      "kikoi",
      "kiley",
      "kilim",
      "kills",
      "kilns",
      "kilos",
      "kilps",
      "kilts",
      "kilty",
      "kimbo",
      "kinas",
      "kinda",
      "kinds",
      "kindy",
      "kines",
      "kings",
      "kinin",
      "kinks",
      "kinos",
      "kiore",
      "kipes",
      "kippa",
      "kipps",
      "kirby",
      "kirks",
      "kirns",
      "kirri",
      "kisan",
      "kissy",
      "kists",
      "kited",
      "kiter",
      "kites",
      "kithe",
      "kiths",
      "kitul",
      "kivas",
      "kiwis",
      "klang",
      "klaps",
      "klett",
      "klick",
      "klieg",
      "kliks",
      "klong",
      "kloof",
      "kluge",
      "klutz",
      "knags",
      "knaps",
      "knarl",
      "knars",
      "knaur",
      "knawe",
      "knees",
      "knell",
      "knish",
      "knits",
      "knive",
      "knobs",
      "knops",
      "knosp",
      "knots",
      "knout",
      "knowe",
      "knows",
      "knubs",
      "knurl",
      "knurr",
      "knurs",
      "knuts",
      "koans",
      "koaps",
      "koban",
      "kobos",
      "koels",
      "koffs",
      "kofta",
      "kogal",
      "kohas",
      "kohen",
      "kohls",
      "koine",
      "kojis",
      "kokam",
      "kokas",
      "koker",
      "kokra",
      "kokum",
      "kolas",
      "kolos",
      "kombu",
      "konbu",
      "kondo",
      "konks",
      "kooks",
      "kooky",
      "koori",
      "kopek",
      "kophs",
      "kopje",
      "koppa",
      "korai",
      "koras",
      "korat",
      "kores",
      "korma",
      "koros",
      "korun",
      "korus",
      "koses",
      "kotch",
      "kotos",
      "kotow",
      "koura",
      "kraal",
      "krabs",
      "kraft",
      "krais",
      "krait",
      "krang",
      "krans",
      "kranz",
      "kraut",
      "krays",
      "kreep",
      "kreng",
      "krewe",
      "krona",
      "krone",
      "kroon",
      "krubi",
      "krunk",
      "ksars",
      "kubie",
      "kudos",
      "kudus",
      "kudzu",
      "kufis",
      "kugel",
      "kuias",
      "kukri",
      "kukus",
      "kulak",
      "kulan",
      "kulas",
      "kulfi",
      "kumis",
      "kumys",
      "kuris",
      "kurre",
      "kurta",
      "kurus",
      "kusso",
      "kutas",
      "kutch",
      "kutis",
      "kutus",
      "kuzus",
      "kvass",
      "kvell",
      "kwela",
      "kyack",
      "kyaks",
      "kyang",
      "kyars",
      "kyats",
      "kybos",
      "kydst",
      "kyles",
      "kylie",
      "kylin",
      "kylix",
      "kyloe",
      "kynde",
      "kynds",
      "kypes",
      "kyrie",
      "kytes",
      "kythe",
      "laari",
      "labda",
      "labia",
      "labis",
      "labra",
      "laced",
      "lacer",
      "laces",
      "lacet",
      "lacey",
      "lacks",
      "laddy",
      "laded",
      "lader",
      "lades",
      "laers",
      "laevo",
      "lagan",
      "lahal",
      "lahar",
      "laich",
      "laics",
      "laids",
      "laigh",
      "laika",
      "laiks",
      "laird",
      "lairs",
      "lairy",
      "laith",
      "laity",
      "laked",
      "laker",
      "lakes",
      "lakhs",
      "lakin",
      "laksa",
      "laldy",
      "lalls",
      "lamas",
      "lambs",
      "lamby",
      "lamed",
      "lamer",
      "lames",
      "lamia",
      "lammy",
      "lamps",
      "lanai",
      "lanas",
      "lanch",
      "lande",
      "lands",
      "lanes",
      "lanks",
      "lants",
      "lapin",
      "lapis",
      "lapje",
      "larch",
      "lards",
      "lardy",
      "laree",
      "lares",
      "largo",
      "laris",
      "larks",
      "larky",
      "larns",
      "larnt",
      "larum",
      "lased",
      "laser",
      "lases",
      "lassi",
      "lassu",
      "lassy",
      "lasts",
      "latah",
      "lated",
      "laten",
      "latex",
      "lathi",
      "laths",
      "lathy",
      "latke",
      "latus",
      "lauan",
      "lauch",
      "lauds",
      "laufs",
      "laund",
      "laura",
      "laval",
      "lavas",
      "laved",
      "laver",
      "laves",
      "lavra",
      "lavvy",
      "lawed",
      "lawer",
      "lawin",
      "lawks",
      "lawns",
      "lawny",
      "laxed",
      "laxer",
      "laxes",
      "laxly",
      "layed",
      "layin",
      "layup",
      "lazar",
      "lazed",
      "lazes",
      "lazos",
      "lazzi",
      "lazzo",
      "leads",
      "leady",
      "leafs",
      "leaks",
      "leams",
      "leans",
      "leany",
      "leaps",
      "leare",
      "lears",
      "leary",
      "leats",
      "leavy",
      "leaze",
      "leben",
      "leccy",
      "ledes",
      "ledgy",
      "ledum",
      "leear",
      "leeks",
      "leeps",
      "leers",
      "leese",
      "leets",
      "leeze",
      "lefte",
      "lefts",
      "leger",
      "leges",
      "legge",
      "leggo",
      "legit",
      "lehrs",
      "lehua",
      "leirs",
      "leish",
      "leman",
      "lemed",
      "lemel",
      "lemes",
      "lemma",
      "lemme",
      "lends",
      "lenes",
      "lengs",
      "lenis",
      "lenos",
      "lense",
      "lenti",
      "lento",
      "leone",
      "lepid",
      "lepra",
      "lepta",
      "lered",
      "leres",
      "lerps",
      "lesbo",
      "leses",
      "lests",
      "letch",
      "lethe",
      "letup",
      "leuch",
      "leuco",
      "leuds",
      "leugh",
      "levas",
      "levee",
      "leves",
      "levin",
      "levis",
      "lewis",
      "lexes",
      "lexis",
      "lezes",
      "lezza",
      "lezzy",
      "liana",
      "liane",
      "liang",
      "liard",
      "liars",
      "liart",
      "liber",
      "libra",
      "libri",
      "lichi",
      "licht",
      "licit",
      "licks",
      "lidar",
      "lidos",
      "liefs",
      "liens",
      "liers",
      "lieus",
      "lieve",
      "lifer",
      "lifes",
      "lifts",
      "ligan",
      "liger",
      "ligge",
      "ligne",
      "liked",
      "liker",
      "likes",
      "likin",
      "lills",
      "lilos",
      "lilts",
      "liman",
      "limas",
      "limax",
      "limba",
      "limbi",
      "limbs",
      "limby",
      "limed",
      "limen",
      "limes",
      "limey",
      "limma",
      "limns",
      "limos",
      "limpa",
      "limps",
      "linac",
      "linch",
      "linds",
      "lindy",
      "lined",
      "lines",
      "liney",
      "linga",
      "lings",
      "lingy",
      "linin",
      "links",
      "linky",
      "linns",
      "linny",
      "linos",
      "lints",
      "linty",
      "linum",
      "linux",
      "lions",
      "lipas",
      "lipes",
      "lipin",
      "lipos",
      "lippy",
      "liras",
      "lirks",
      "lirot",
      "lisks",
      "lisle",
      "lisps",
      "lists",
      "litai",
      "litas",
      "lited",
      "liter",
      "lites",
      "litho",
      "liths",
      "litre",
      "lived",
      "liven",
      "lives",
      "livor",
      "livre",
      "llano",
      "loach",
      "loads",
      "loafs",
      "loams",
      "loans",
      "loast",
      "loave",
      "lobar",
      "lobed",
      "lobes",
      "lobos",
      "lobus",
      "loche",
      "lochs",
      "locie",
      "locis",
      "locks",
      "locos",
      "locum",
      "loden",
      "lodes",
      "loess",
      "lofts",
      "logan",
      "loges",
      "loggy",
      "logia",
      "logie",
      "logoi",
      "logon",
      "logos",
      "lohan",
      "loids",
      "loins",
      "loipe",
      "loirs",
      "lokes",
      "lolls",
      "lolly",
      "lolog",
      "lomas",
      "lomed",
      "lomes",
      "loner",
      "longa",
      "longe",
      "longs",
      "looby",
      "looed",
      "looey",
      "loofa",
      "loofs",
      "looie",
      "looks",
      "looky",
      "looms",
      "loons",
      "loony",
      "loops",
      "loord",
      "loots",
      "loped",
      "loper",
      "lopes",
      "loppy",
      "loral",
      "loran",
      "lords",
      "lordy",
      "lorel",
      "lores",
      "loric",
      "loris",
      "losed",
      "losel",
      "losen",
      "loses",
      "lossy",
      "lotah",
      "lotas",
      "lotes",
      "lotic",
      "lotos",
      "lotsa",
      "lotta",
      "lotte",
      "lotto",
      "lotus",
      "loued",
      "lough",
      "louie",
      "louis",
      "louma",
      "lound",
      "louns",
      "loupe",
      "loups",
      "loure",
      "lours",
      "loury",
      "louts",
      "lovat",
      "loved",
      "loves",
      "lovey",
      "lovie",
      "lowan",
      "lowed",
      "lowes",
      "lownd",
      "lowne",
      "lowns",
      "lowps",
      "lowry",
      "lowse",
      "lowts",
      "loxed",
      "loxes",
      "lozen",
      "luach",
      "luaus",
      "lubed",
      "lubes",
      "lubra",
      "luces",
      "lucks",
      "lucre",
      "ludes",
      "ludic",
      "ludos",
      "luffa",
      "luffs",
      "luged",
      "luger",
      "luges",
      "lulls",
      "lulus",
      "lumas",
      "lumbi",
      "lumme",
      "lummy",
      "lumps",
      "lunas",
      "lunes",
      "lunet",
      "lungi",
      "lungs",
      "lunks",
      "lunts",
      "lupin",
      "lured",
      "lurer",
      "lures",
      "lurex",
      "lurgi",
      "lurgy",
      "lurks",
      "lurry",
      "lurve",
      "luser",
      "lushy",
      "lusks",
      "lusts",
      "lusus",
      "lutea",
      "luted",
      "luter",
      "lutes",
      "luvvy",
      "luxed",
      "luxer",
      "luxes",
      "lweis",
      "lyams",
      "lyard",
      "lyart",
      "lyase",
      "lycea",
      "lycee",
      "lycra",
      "lymes",
      "lynes",
      "lyres",
      "lysed",
      "lyses",
      "lysin",
      "lysis",
      "lysol",
      "lyssa",
      "lyted",
      "lytes",
      "lythe",
      "lytic",
      "lytta",
      "maaed",
      "maare",
      "maars",
      "mabes",
      "macas",
      "maced",
      "macer",
      "maces",
      "mache",
      "machi",
      "machs",
      "macks",
      "macle",
      "macon",
      "madge",
      "madid",
      "madre",
      "maerl",
      "mafic",
      "mages",
      "maggs",
      "magot",
      "magus",
      "mahoe",
      "mahua",
      "mahwa",
      "maids",
      "maiko",
      "maiks",
      "maile",
      "maill",
      "mails",
      "maims",
      "mains",
      "maire",
      "mairs",
      "maise",
      "maist",
      "makar",
      "makes",
      "makis",
      "makos",
      "malam",
      "malar",
      "malas",
      "malax",
      "males",
      "malic",
      "malik",
      "malis",
      "malls",
      "malms",
      "malmy",
      "malts",
      "malty",
      "malus",
      "malva",
      "malwa",
      "mamas",
      "mamba",
      "mamee",
      "mamey",
      "mamie",
      "manas",
      "manat",
      "mandi",
      "maneb",
      "maned",
      "maneh",
      "manes",
      "manet",
      "mangs",
      "manis",
      "manky",
      "manna",
      "manos",
      "manse",
      "manta",
      "manto",
      "manty",
      "manul",
      "manus",
      "mapau",
      "maqui",
      "marae",
      "marah",
      "maras",
      "marcs",
      "mardy",
      "mares",
      "marge",
      "margs",
      "maria",
      "marid",
      "marka",
      "marks",
      "marle",
      "marls",
      "marly",
      "marms",
      "maron",
      "maror",
      "marra",
      "marri",
      "marse",
      "marts",
      "marvy",
      "masas",
      "mased",
      "maser",
      "mases",
      "mashy",
      "masks",
      "massa",
      "massy",
      "masts",
      "masty",
      "masus",
      "matai",
      "mated",
      "mater",
      "mates",
      "maths",
      "matin",
      "matlo",
      "matte",
      "matts",
      "matza",
      "matzo",
      "mauby",
      "mauds",
      "mauls",
      "maund",
      "mauri",
      "mausy",
      "mauts",
      "mauzy",
      "maven",
      "mavie",
      "mavin",
      "mavis",
      "mawed",
      "mawks",
      "mawky",
      "mawns",
      "mawrs",
      "maxed",
      "maxes",
      "maxis",
      "mayan",
      "mayas",
      "mayed",
      "mayos",
      "mayst",
      "mazed",
      "mazer",
      "mazes",
      "mazey",
      "mazut",
      "mbira",
      "meads",
      "meals",
      "meane",
      "means",
      "meany",
      "meare",
      "mease",
      "meath",
      "meats",
      "mebos",
      "mechs",
      "mecks",
      "medii",
      "medle",
      "meeds",
      "meers",
      "meets",
      "meffs",
      "meins",
      "meint",
      "meiny",
      "meith",
      "mekka",
      "melas",
      "melba",
      "melds",
      "melic",
      "melik",
      "mells",
      "melts",
      "melty",
      "memes",
      "memos",
      "menad",
      "mends",
      "mened",
      "menes",
      "menge",
      "mengs",
      "mensa",
      "mense",
      "mensh",
      "menta",
      "mento",
      "menus",
      "meous",
      "meows",
      "merch",
      "mercs",
      "merde",
      "mered",
      "merel",
      "merer",
      "meres",
      "meril",
      "meris",
      "merks",
      "merle",
      "merls",
      "merse",
      "mesal",
      "mesas",
      "mesel",
      "meses",
      "meshy",
      "mesic",
      "mesne",
      "meson",
      "messy",
      "mesto",
      "meted",
      "metes",
      "metho",
      "meths",
      "metic",
      "metif",
      "metis",
      "metol",
      "metre",
      "meuse",
      "meved",
      "meves",
      "mewed",
      "mewls",
      "meynt",
      "mezes",
      "mezze",
      "mezzo",
      "mhorr",
      "miaou",
      "miaow",
      "miasm",
      "miaul",
      "micas",
      "miche",
      "micht",
      "micks",
      "micky",
      "micos",
      "micra",
      "middy",
      "midgy",
      "midis",
      "miens",
      "mieve",
      "miffs",
      "miffy",
      "mifty",
      "miggs",
      "mihas",
      "mihis",
      "miked",
      "mikes",
      "mikra",
      "mikva",
      "milch",
      "milds",
      "miler",
      "miles",
      "milfs",
      "milia",
      "milko",
      "milks",
      "mille",
      "mills",
      "milor",
      "milos",
      "milpa",
      "milts",
      "milty",
      "miltz",
      "mimed",
      "mimeo",
      "mimer",
      "mimes",
      "mimsy",
      "minae",
      "minar",
      "minas",
      "mincy",
      "minds",
      "mined",
      "mines",
      "minge",
      "mings",
      "mingy",
      "minis",
      "minke",
      "minks",
      "minny",
      "minos",
      "mints",
      "mired",
      "mires",
      "mirex",
      "mirid",
      "mirin",
      "mirks",
      "mirky",
      "mirly",
      "miros",
      "mirvs",
      "mirza",
      "misch",
      "misdo",
      "mises",
      "misgo",
      "misos",
      "missa",
      "mists",
      "misty",
      "mitch",
      "miter",
      "mites",
      "mitis",
      "mitre",
      "mitts",
      "mixed",
      "mixen",
      "mixer",
      "mixes",
      "mixte",
      "mixup",
      "mizen",
      "mizzy",
      "mneme",
      "moans",
      "moats",
      "mobby",
      "mobes",
      "mobey",
      "mobie",
      "moble",
      "mochi",
      "mochs",
      "mochy",
      "mocks",
      "moder",
      "modes",
      "modge",
      "modii",
      "modus",
      "moers",
      "mofos",
      "moggy",
      "mohel",
      "mohos",
      "mohrs",
      "mohua",
      "mohur",
      "moile",
      "moils",
      "moira",
      "moire",
      "moits",
      "mojos",
      "mokes",
      "mokis",
      "mokos",
      "molal",
      "molas",
      "molds",
      "moled",
      "moles",
      "molla",
      "molls",
      "molly",
      "molto",
      "molts",
      "molys",
      "momes",
      "momma",
      "mommy",
      "momus",
      "monad",
      "monal",
      "monas",
      "monde",
      "mondo",
      "moner",
      "mongo",
      "mongs",
      "monic",
      "monie",
      "monks",
      "monos",
      "monte",
      "monty",
      "moobs",
      "mooch",
      "moods",
      "mooed",
      "mooks",
      "moola",
      "mooli",
      "mools",
      "mooly",
      "moong",
      "moons",
      "moony",
      "moops",
      "moors",
      "moory",
      "moots",
      "moove",
      "moped",
      "moper",
      "mopes",
      "mopey",
      "moppy",
      "mopsy",
      "mopus",
      "morae",
      "moras",
      "morat",
      "moray",
      "morel",
      "mores",
      "moria",
      "morne",
      "morns",
      "morra",
      "morro",
      "morse",
      "morts",
      "mosed",
      "moses",
      "mosey",
      "mosks",
      "mosso",
      "moste",
      "mosts",
      "moted",
      "moten",
      "motes",
      "motet",
      "motey",
      "moths",
      "mothy",
      "motis",
      "motte",
      "motts",
      "motty",
      "motus",
      "motza",
      "mouch",
      "moues",
      "mould",
      "mouls",
      "moups",
      "moust",
      "mousy",
      "moved",
      "moves",
      "mowas",
      "mowed",
      "mowra",
      "moxas",
      "moxie",
      "moyas",
      "moyle",
      "moyls",
      "mozed",
      "mozes",
      "mozos",
      "mpret",
      "mucho",
      "mucic",
      "mucid",
      "mucin",
      "mucks",
      "mucor",
      "mucro",
      "mudge",
      "mudir",
      "mudra",
      "muffs",
      "mufti",
      "mugga",
      "muggs",
      "muggy",
      "muhly",
      "muids",
      "muils",
      "muirs",
      "muist",
      "mujik",
      "mulct",
      "muled",
      "mules",
      "muley",
      "mulga",
      "mulie",
      "mulla",
      "mulls",
      "mulse",
      "mulsh",
      "mumms",
      "mumps",
      "mumsy",
      "mumus",
      "munga",
      "munge",
      "mungo",
      "mungs",
      "munis",
      "munts",
      "muntu",
      "muons",
      "muras",
      "mured",
      "mures",
      "murex",
      "murid",
      "murks",
      "murls",
      "murly",
      "murra",
      "murre",
      "murri",
      "murrs",
      "murry",
      "murti",
      "murva",
      "musar",
      "musca",
      "mused",
      "muser",
      "muses",
      "muset",
      "musha",
      "musit",
      "musks",
      "musos",
      "musse",
      "mussy",
      "musth",
      "musts",
      "mutch",
      "muted",
      "muter",
      "mutes",
      "mutha",
      "mutis",
      "muton",
      "mutts",
      "muxed",
      "muxes",
      "muzak",
      "muzzy",
      "mvule",
      "myall",
      "mylar",
      "mynah",
      "mynas",
      "myoid",
      "myoma",
      "myope",
      "myops",
      "myopy",
      "mysid",
      "mythi",
      "myths",
      "mythy",
      "myxos",
      "mzees",
      "naams",
      "naans",
      "nabes",
      "nabis",
      "nabks",
      "nabla",
      "nabob",
      "nache",
      "nacho",
      "nacre",
      "nadas",
      "naeve",
      "naevi",
      "naffs",
      "nagas",
      "naggy",
      "nagor",
      "nahal",
      "naiad",
      "naifs",
      "naiks",
      "nails",
      "naira",
      "nairu",
      "naked",
      "naker",
      "nakfa",
      "nalas",
      "naled",
      "nalla",
      "named",
      "namer",
      "names",
      "namma",
      "namus",
      "nanas",
      "nance",
      "nancy",
      "nandu",
      "nanna",
      "nanos",
      "nanua",
      "napas",
      "naped",
      "napes",
      "napoo",
      "nappa",
      "nappe",
      "nappy",
      "naras",
      "narco",
      "narcs",
      "nards",
      "nares",
      "naric",
      "naris",
      "narks",
      "narky",
      "narre",
      "nashi",
      "natch",
      "nates",
      "natis",
      "natty",
      "nauch",
      "naunt",
      "navar",
      "naves",
      "navew",
      "navvy",
      "nawab",
      "nazes",
      "nazir",
      "nazis",
      "nduja",
      "neafe",
      "neals",
      "neaps",
      "nears",
      "neath",
      "neats",
      "nebek",
      "nebel",
      "necks",
      "neddy",
      "needs",
      "neeld",
      "neele",
      "neemb",
      "neems",
      "neeps",
      "neese",
      "neeze",
      "negro",
      "negus",
      "neifs",
      "neist",
      "neive",
      "nelis",
      "nelly",
      "nemas",
      "nemns",
      "nempt",
      "nenes",
      "neons",
      "neper",
      "nepit",
      "neral",
      "nerds",
      "nerka",
      "nerks",
      "nerol",
      "nerts",
      "nertz",
      "nervy",
      "nests",
      "netes",
      "netop",
      "netts",
      "netty",
      "neuks",
      "neume",
      "neums",
      "nevel",
      "neves",
      "nevus",
      "newbs",
      "newed",
      "newel",
      "newie",
      "newsy",
      "newts",
      "nexts",
      "nexus",
      "ngaio",
      "ngana",
      "ngati",
      "ngoma",
      "ngwee",
      "nicad",
      "nicht",
      "nicks",
      "nicol",
      "nidal",
      "nided",
      "nides",
      "nidor",
      "nidus",
      "niefs",
      "nieve",
      "nifes",
      "niffs",
      "niffy",
      "nifty",
      "niger",
      "nighs",
      "nihil",
      "nikab",
      "nikah",
      "nikau",
      "nills",
      "nimbi",
      "nimbs",
      "nimps",
      "niner",
      "nines",
      "ninon",
      "nipas",
      "nippy",
      "niqab",
      "nirls",
      "nirly",
      "nisei",
      "nisse",
      "nisus",
      "niter",
      "nites",
      "nitid",
      "niton",
      "nitre",
      "nitro",
      "nitry",
      "nitty",
      "nival",
      "nixed",
      "nixer",
      "nixes",
      "nixie",
      "nizam",
      "nkosi",
      "noahs",
      "nobby",
      "nocks",
      "nodal",
      "noddy",
      "nodes",
      "nodus",
      "noels",
      "noggs",
      "nohow",
      "noils",
      "noily",
      "noint",
      "noirs",
      "noles",
      "nolls",
      "nolos",
      "nomas",
      "nomen",
      "nomes",
      "nomic",
      "nomoi",
      "nomos",
      "nonas",
      "nonce",
      "nones",
      "nonet",
      "nongs",
      "nonis",
      "nonny",
      "nonyl",
      "noobs",
      "nooit",
      "nooks",
      "nooky",
      "noons",
      "noops",
      "nopal",
      "noria",
      "noris",
      "norks",
      "norma",
      "norms",
      "nosed",
      "noser",
      "noses",
      "notal",
      "noted",
      "noter",
      "notes",
      "notum",
      "nould",
      "noule",
      "nouls",
      "nouns",
      "nouny",
      "noups",
      "novae",
      "novas",
      "novum",
      "noway",
      "nowed",
      "nowls",
      "nowts",
      "nowty",
      "noxal",
      "noxes",
      "noyau",
      "noyed",
      "noyes",
      "nubby",
      "nubia",
      "nucha",
      "nuddy",
      "nuder",
      "nudes",
      "nudie",
      "nudzh",
      "nuffs",
      "nugae",
      "nuked",
      "nukes",
      "nulla",
      "nulls",
      "numbs",
      "numen",
      "nummy",
      "nunny",
      "nurds",
      "nurdy",
      "nurls",
      "nurrs",
      "nutso",
      "nutsy",
      "nyaff",
      "nyala",
      "nying",
      "nyssa",
      "oaked",
      "oaker",
      "oakum",
      "oared",
      "oases",
      "oasis",
      "oasts",
      "oaten",
      "oater",
      "oaths",
      "oaves",
      "obang",
      "obeah",
      "obeli",
      "obeys",
      "obias",
      "obied",
      "obiit",
      "obits",
      "objet",
      "oboes",
      "obole",
      "oboli",
      "obols",
      "occam",
      "ocher",
      "oches",
      "ochre",
      "ochry",
      "ocker",
      "ocrea",
      "octad",
      "octan",
      "octas",
      "octyl",
      "oculi",
      "odahs",
      "odals",
      "odeon",
      "odeum",
      "odism",
      "odist",
      "odium",
      "odors",
      "odour",
      "odyle",
      "odyls",
      "ofays",
      "offed",
      "offie",
      "oflag",
      "ofter",
      "ogams",
      "ogeed",
      "ogees",
      "oggin",
      "ogham",
      "ogive",
      "ogled",
      "ogler",
      "ogles",
      "ogmic",
      "ogres",
      "ohias",
      "ohing",
      "ohmic",
      "ohone",
      "oidia",
      "oiled",
      "oiler",
      "oinks",
      "oints",
      "ojime",
      "okapi",
      "okays",
      "okehs",
      "okras",
      "oktas",
      "oldie",
      "oleic",
      "olein",
      "olent",
      "oleos",
      "oleum",
      "olios",
      "ollas",
      "ollav",
      "oller",
      "ollie",
      "ology",
      "olpae",
      "olpes",
      "omasa",
      "omber",
      "ombus",
      "omens",
      "omers",
      "omits",
      "omlah",
      "omovs",
      "omrah",
      "oncer",
      "onces",
      "oncet",
      "oncus",
      "onely",
      "oners",
      "onery",
      "onium",
      "onkus",
      "onlay",
      "onned",
      "ontic",
      "oobit",
      "oohed",
      "oomph",
      "oonts",
      "ooped",
      "oorie",
      "ooses",
      "ootid",
      "oozed",
      "oozes",
      "opahs",
      "opals",
      "opens",
      "opepe",
      "oping",
      "oppos",
      "opsin",
      "opted",
      "opter",
      "orach",
      "oracy",
      "orals",
      "orang",
      "orant",
      "orate",
      "orbed",
      "orcas",
      "orcin",
      "ordos",
      "oread",
      "orfes",
      "orgia",
      "orgic",
      "orgue",
      "oribi",
      "oriel",
      "orixa",
      "orles",
      "orlon",
      "orlop",
      "ormer",
      "ornis",
      "orpin",
      "orris",
      "ortho",
      "orval",
      "orzos",
      "oscar",
      "oshac",
      "osier",
      "osmic",
      "osmol",
      "ossia",
      "ostia",
      "otaku",
      "otary",
      "ottar",
      "ottos",
      "oubit",
      "oucht",
      "ouens",
      "ouija",
      "oulks",
      "oumas",
      "oundy",
      "oupas",
      "ouped",
      "ouphe",
      "ouphs",
      "ourie",
      "ousel",
      "ousts",
      "outby",
      "outed",
      "outre",
      "outro",
      "outta",
      "ouzel",
      "ouzos",
      "ovals",
      "ovels",
      "ovens",
      "overs",
      "ovist",
      "ovoli",
      "ovolo",
      "ovule",
      "owche",
      "owies",
      "owled",
      "owler",
      "owlet",
      "owned",
      "owres",
      "owrie",
      "owsen",
      "oxbow",
      "oxers",
      "oxeye",
      "oxids",
      "oxies",
      "oxime",
      "oxims",
      "oxlip",
      "oxter",
      "oyers",
      "ozeki",
      "ozzie",
      "paals",
      "paans",
      "pacas",
      "paced",
      "pacer",
      "paces",
      "pacey",
      "pacha",
      "packs",
      "pacos",
      "pacta",
      "pacts",
      "padis",
      "padle",
      "padma",
      "padre",
      "padri",
      "paean",
      "paedo",
      "paeon",
      "paged",
      "pager",
      "pages",
      "pagle",
      "pagod",
      "pagri",
      "paiks",
      "pails",
      "pains",
      "paire",
      "pairs",
      "paisa",
      "paise",
      "pakka",
      "palas",
      "palay",
      "palea",
      "paled",
      "pales",
      "palet",
      "palis",
      "palki",
      "palla",
      "palls",
      "pally",
      "palms",
      "palmy",
      "palpi",
      "palps",
      "palsa",
      "pampa",
      "panax",
      "pance",
      "panda",
      "pands",
      "pandy",
      "paned",
      "panes",
      "panga",
      "pangs",
      "panim",
      "panko",
      "panne",
      "panni",
      "panto",
      "pants",
      "panty",
      "paoli",
      "paolo",
      "papas",
      "papaw",
      "papes",
      "pappi",
      "pappy",
      "parae",
      "paras",
      "parch",
      "pardi",
      "pards",
      "pardy",
      "pared",
      "paren",
      "pareo",
      "pares",
      "pareu",
      "parev",
      "parge",
      "pargo",
      "paris",
      "parki",
      "parks",
      "parky",
      "parle",
      "parly",
      "parma",
      "parol",
      "parps",
      "parra",
      "parrs",
      "parti",
      "parts",
      "parve",
      "parvo",
      "paseo",
      "pases",
      "pasha",
      "pashm",
      "paska",
      "paspy",
      "passe",
      "pasts",
      "pated",
      "paten",
      "pater",
      "pates",
      "paths",
      "patin",
      "patka",
      "patly",
      "patte",
      "patus",
      "pauas",
      "pauls",
      "pavan",
      "paved",
      "paven",
      "paver",
      "paves",
      "pavid",
      "pavin",
      "pavis",
      "pawas",
      "pawaw",
      "pawed",
      "pawer",
      "pawks",
      "pawky",
      "pawls",
      "pawns",
      "paxes",
      "payed",
      "payor",
      "paysd",
      "peage",
      "peags",
      "peaks",
      "peaky",
      "peals",
      "peans",
      "peare",
      "pears",
      "peart",
      "pease",
      "peats",
      "peaty",
      "peavy",
      "peaze",
      "pebas",
      "pechs",
      "pecke",
      "pecks",
      "pecky",
      "pedes",
      "pedis",
      "pedro",
      "peece",
      "peeks",
      "peels",
      "peens",
      "peeoy",
      "peepe",
      "peeps",
      "peers",
      "peery",
      "peeve",
      "peggy",
      "peghs",
      "peins",
      "peise",
      "peize",
      "pekan",
      "pekes",
      "pekin",
      "pekoe",
      "pelas",
      "pelau",
      "peles",
      "pelfs",
      "pells",
      "pelma",
      "pelon",
      "pelta",
      "pelts",
      "pends",
      "pendu",
      "pened",
      "penes",
      "pengo",
      "penie",
      "penis",
      "penks",
      "penna",
      "penni",
      "pents",
      "peons",
      "peony",
      "pepla",
      "pepos",
      "peppy",
      "pepsi",
      "perai",
      "perce",
      "percs",
      "perdu",
      "perdy",
      "perea",
      "peres",
      "peris",
      "perks",
      "perms",
      "perns",
      "perog",
      "perps",
      "perry",
      "perse",
      "perst",
      "perts",
      "perve",
      "pervo",
      "pervs",
      "pervy",
      "pesos",
      "pests",
      "pesty",
      "petar",
      "peter",
      "petit",
      "petre",
      "petri",
      "petti",
      "petto",
      "pewee",
      "pewit",
      "peyse",
      "phage",
      "phang",
      "phare",
      "pharm",
      "pheer",
      "phene",
      "pheon",
      "phese",
      "phial",
      "phish",
      "phizz",
      "phlox",
      "phoca",
      "phono",
      "phons",
      "phots",
      "phpht",
      "phuts",
      "phyla",
      "phyle",
      "piani",
      "pians",
      "pibal",
      "pical",
      "picas",
      "piccy",
      "picks",
      "picot",
      "picra",
      "picul",
      "piend",
      "piers",
      "piert",
      "pieta",
      "piets",
      "piezo",
      "pight",
      "pigmy",
      "piing",
      "pikas",
      "pikau",
      "piked",
      "piker",
      "pikes",
      "pikey",
      "pikis",
      "pikul",
      "pilae",
      "pilaf",
      "pilao",
      "pilar",
      "pilau",
      "pilaw",
      "pilch",
      "pilea",
      "piled",
      "pilei",
      "piler",
      "piles",
      "pilis",
      "pills",
      "pilow",
      "pilum",
      "pilus",
      "pimas",
      "pimps",
      "pinas",
      "pined",
      "pines",
      "pingo",
      "pings",
      "pinko",
      "pinks",
      "pinna",
      "pinny",
      "pinon",
      "pinot",
      "pinta",
      "pints",
      "pinup",
      "pions",
      "piony",
      "pious",
      "pioye",
      "pioys",
      "pipal",
      "pipas",
      "piped",
      "pipes",
      "pipet",
      "pipis",
      "pipit",
      "pippy",
      "pipul",
      "pirai",
      "pirls",
      "pirns",
      "pirog",
      "pisco",
      "pises",
      "pisky",
      "pisos",
      "pissy",
      "piste",
      "pitas",
      "piths",
      "piton",
      "pitot",
      "pitta",
      "piums",
      "pixes",
      "pized",
      "pizes",
      "plaas",
      "plack",
      "plage",
      "plans",
      "plaps",
      "plash",
      "plasm",
      "plast",
      "plats",
      "platt",
      "platy",
      "playa",
      "plays",
      "pleas",
      "plebe",
      "plebs",
      "plena",
      "pleon",
      "plesh",
      "plews",
      "plica",
      "plies",
      "plims",
      "pling",
      "plink",
      "ploat",
      "plods",
      "plong",
      "plonk",
      "plook",
      "plops",
      "plots",
      "plotz",
      "plouk",
      "plows",
      "ploye",
      "ploys",
      "plues",
      "pluff",
      "plugs",
      "plums",
      "plumy",
      "pluot",
      "pluto",
      "plyer",
      "poach",
      "poaka",
      "poake",
      "poboy",
      "pocks",
      "pocky",
      "podal",
      "poddy",
      "podex",
      "podge",
      "podgy",
      "podia",
      "poems",
      "poeps",
      "poets",
      "pogey",
      "pogge",
      "pogos",
      "pohed",
      "poilu",
      "poind",
      "pokal",
      "poked",
      "pokes",
      "pokey",
      "pokie",
      "poled",
      "poler",
      "poles",
      "poley",
      "polio",
      "polis",
      "polje",
      "polks",
      "polls",
      "polly",
      "polos",
      "polts",
      "polys",
      "pombe",
      "pomes",
      "pommy",
      "pomos",
      "pomps",
      "ponce",
      "poncy",
      "ponds",
      "pones",
      "poney",
      "ponga",
      "pongo",
      "pongs",
      "pongy",
      "ponks",
      "ponts",
      "ponty",
      "ponzu",
      "poods",
      "pooed",
      "poofs",
      "poofy",
      "poohs",
      "pooja",
      "pooka",
      "pooks",
      "pools",
      "poons",
      "poops",
      "poopy",
      "poori",
      "poort",
      "poots",
      "poove",
      "poovy",
      "popes",
      "poppa",
      "popsy",
      "porae",
      "poral",
      "pored",
      "porer",
      "pores",
      "porge",
      "porgy",
      "porin",
      "porks",
      "porky",
      "porno",
      "porns",
      "porny",
      "porta",
      "ports",
      "porty",
      "posed",
      "poses",
      "posey",
      "posho",
      "posts",
      "potae",
      "potch",
      "poted",
      "potes",
      "potin",
      "potoo",
      "potsy",
      "potto",
      "potts",
      "potty",
      "pouff",
      "poufs",
      "pouke",
      "pouks",
      "poule",
      "poulp",
      "poult",
      "poupe",
      "poupt",
      "pours",
      "pouts",
      "powan",
      "powin",
      "pownd",
      "powns",
      "powny",
      "powre",
      "poxed",
      "poxes",
      "poynt",
      "poyou",
      "poyse",
      "pozzy",
      "praam",
      "prads",
      "prahu",
      "prams",
      "prana",
      "prang",
      "praos",
      "prase",
      "prate",
      "prats",
      "pratt",
      "praty",
      "praus",
      "prays",
      "predy",
      "preed",
      "prees",
      "preif",
      "prems",
      "premy",
      "prent",
      "preon",
      "preop",
      "preps",
      "presa",
      "prese",
      "prest",
      "preve",
      "prexy",
      "preys",
      "prial",
      "pricy",
      "prief",
      "prier",
      "pries",
      "prigs",
      "prill",
      "prima",
      "primi",
      "primp",
      "prims",
      "primy",
      "prink",
      "prion",
      "prise",
      "priss",
      "proas",
      "probs",
      "prods",
      "proem",
      "profs",
      "progs",
      "proin",
      "proke",
      "prole",
      "proll",
      "promo",
      "proms",
      "pronk",
      "props",
      "prore",
      "proso",
      "pross",
      "prost",
      "prosy",
      "proto",
      "proul",
      "prows",
      "proyn",
      "prunt",
      "pruta",
      "pryer",
      "pryse",
      "pseud",
      "pshaw",
      "psion",
      "psoae",
      "psoai",
      "psoas",
      "psora",
      "psych",
      "psyop",
      "pubco",
      "pubes",
      "pubis",
      "pucan",
      "pucer",
      "puces",
      "pucka",
      "pucks",
      "puddy",
      "pudge",
      "pudic",
      "pudor",
      "pudsy",
      "pudus",
      "puers",
      "puffa",
      "puffs",
      "puggy",
      "pugil",
      "puhas",
      "pujah",
      "pujas",
      "pukas",
      "puked",
      "puker",
      "pukes",
      "pukey",
      "pukka",
      "pukus",
      "pulao",
      "pulas",
      "puled",
      "puler",
      "pules",
      "pulik",
      "pulis",
      "pulka",
      "pulks",
      "pulli",
      "pulls",
      "pully",
      "pulmo",
      "pulps",
      "pulus",
      "pumas",
      "pumie",
      "pumps",
      "punas",
      "punce",
      "punga",
      "pungs",
      "punji",
      "punka",
      "punks",
      "punky",
      "punny",
      "punto",
      "punts",
      "punty",
      "pupae",
      "pupas",
      "pupus",
      "purda",
      "pured",
      "pures",
      "purin",
      "puris",
      "purls",
      "purpy",
      "purrs",
      "pursy",
      "purty",
      "puses",
      "pusle",
      "pussy",
      "putid",
      "puton",
      "putti",
      "putto",
      "putts",
      "puzel",
      "pwned",
      "pyats",
      "pyets",
      "pygal",
      "pyins",
      "pylon",
      "pyned",
      "pynes",
      "pyoid",
      "pyots",
      "pyral",
      "pyran",
      "pyres",
      "pyrex",
      "pyric",
      "pyros",
      "pyxed",
      "pyxes",
      "pyxie",
      "pyxis",
      "pzazz",
      "qadis",
      "qaids",
      "qajaq",
      "qanat",
      "qapik",
      "qibla",
      "qophs",
      "qorma",
      "quads",
      "quaff",
      "quags",
      "quair",
      "quais",
      "quaky",
      "quale",
      "quant",
      "quare",
      "quass",
      "quate",
      "quats",
      "quayd",
      "quays",
      "qubit",
      "quean",
      "queme",
      "quena",
      "quern",
      "queyn",
      "queys",
      "quich",
      "quids",
      "quiff",
      "quims",
      "quina",
      "quine",
      "quino",
      "quins",
      "quint",
      "quipo",
      "quips",
      "quipu",
      "quire",
      "quirt",
      "quist",
      "quits",
      "quoad",
      "quods",
      "quoif",
      "quoin",
      "quoit",
      "quoll",
      "quonk",
      "quops",
      "qursh",
      "quyte",
      "rabat",
      "rabic",
      "rabis",
      "raced",
      "races",
      "rache",
      "racks",
      "racon",
      "radge",
      "radix",
      "radon",
      "raffs",
      "rafts",
      "ragas",
      "ragde",
      "raged",
      "ragee",
      "rager",
      "rages",
      "ragga",
      "raggs",
      "raggy",
      "ragis",
      "ragus",
      "rahed",
      "rahui",
      "raias",
      "raids",
      "raiks",
      "raile",
      "rails",
      "raine",
      "rains",
      "raird",
      "raita",
      "raits",
      "rajas",
      "rajes",
      "raked",
      "rakee",
      "raker",
      "rakes",
      "rakia",
      "rakis",
      "rakus",
      "rales",
      "ramal",
      "ramee",
      "ramet",
      "ramie",
      "ramin",
      "ramis",
      "rammy",
      "ramps",
      "ramus",
      "ranas",
      "rance",
      "rands",
      "ranee",
      "ranga",
      "rangi",
      "rangs",
      "rangy",
      "ranid",
      "ranis",
      "ranke",
      "ranks",
      "rants",
      "raped",
      "raper",
      "rapes",
      "raphe",
      "rappe",
      "rared",
      "raree",
      "rares",
      "rarks",
      "rased",
      "raser",
      "rases",
      "rasps",
      "rasse",
      "rasta",
      "ratal",
      "ratan",
      "ratas",
      "ratch",
      "rated",
      "ratel",
      "rater",
      "rates",
      "ratha",
      "rathe",
      "raths",
      "ratoo",
      "ratos",
      "ratus",
      "rauns",
      "raupo",
      "raved",
      "ravel",
      "raver",
      "raves",
      "ravey",
      "ravin",
      "rawer",
      "rawin",
      "rawly",
      "rawns",
      "raxed",
      "raxes",
      "rayah",
      "rayas",
      "rayed",
      "rayle",
      "rayne",
      "razed",
      "razee",
      "razer",
      "razes",
      "razoo",
      "readd",
      "reads",
      "reais",
      "reaks",
      "realo",
      "reals",
      "reame",
      "reams",
      "reamy",
      "reans",
      "reaps",
      "rears",
      "reast",
      "reata",
      "reate",
      "reave",
      "rebbe",
      "rebec",
      "rebid",
      "rebit",
      "rebop",
      "rebuy",
      "recal",
      "recce",
      "recco",
      "reccy",
      "recit",
      "recks",
      "recon",
      "recta",
      "recti",
      "recto",
      "redan",
      "redds",
      "reddy",
      "reded",
      "redes",
      "redia",
      "redid",
      "redip",
      "redly",
      "redon",
      "redos",
      "redox",
      "redry",
      "redub",
      "redux",
      "redye",
      "reech",
      "reede",
      "reeds",
      "reefs",
      "reefy",
      "reeks",
      "reeky",
      "reels",
      "reens",
      "reest",
      "reeve",
      "refed",
      "refel",
      "reffo",
      "refis",
      "refix",
      "refly",
      "refry",
      "regar",
      "reges",
      "reggo",
      "regie",
      "regma",
      "regna",
      "regos",
      "regur",
      "rehem",
      "reifs",
      "reify",
      "reiki",
      "reiks",
      "reink",
      "reins",
      "reird",
      "reist",
      "reive",
      "rejig",
      "rejon",
      "reked",
      "rekes",
      "rekey",
      "relet",
      "relie",
      "relit",
      "rello",
      "reman",
      "remap",
      "remen",
      "remet",
      "remex",
      "remix",
      "renay",
      "rends",
      "reney",
      "renga",
      "renig",
      "renin",
      "renne",
      "renos",
      "rente",
      "rents",
      "reoil",
      "reorg",
      "repeg",
      "repin",
      "repla",
      "repos",
      "repot",
      "repps",
      "repro",
      "reran",
      "rerig",
      "resat",
      "resaw",
      "resay",
      "resee",
      "reses",
      "resew",
      "resid",
      "resit",
      "resod",
      "resow",
      "resto",
      "rests",
      "resty",
      "resus",
      "retag",
      "retax",
      "retem",
      "retia",
      "retie",
      "retox",
      "revet",
      "revie",
      "rewan",
      "rewax",
      "rewed",
      "rewet",
      "rewin",
      "rewon",
      "rewth",
      "rexes",
      "rezes",
      "rheas",
      "rheme",
      "rheum",
      "rhies",
      "rhime",
      "rhine",
      "rhody",
      "rhomb",
      "rhone",
      "rhumb",
      "rhyne",
      "rhyta",
      "riads",
      "rials",
      "riant",
      "riata",
      "ribas",
      "ribby",
      "ribes",
      "riced",
      "ricer",
      "rices",
      "ricey",
      "richt",
      "ricin",
      "ricks",
      "rides",
      "ridgy",
      "ridic",
      "riels",
      "riems",
      "rieve",
      "rifer",
      "riffs",
      "rifte",
      "rifts",
      "rifty",
      "riggs",
      "rigol",
      "riled",
      "riles",
      "riley",
      "rille",
      "rills",
      "rimae",
      "rimed",
      "rimer",
      "rimes",
      "rimus",
      "rinds",
      "rindy",
      "rines",
      "rings",
      "rinks",
      "rioja",
      "riots",
      "riped",
      "ripes",
      "ripps",
      "rises",
      "rishi",
      "risks",
      "risps",
      "risus",
      "rites",
      "ritts",
      "ritzy",
      "rivas",
      "rived",
      "rivel",
      "riven",
      "rives",
      "riyal",
      "rizas",
      "roads",
      "roams",
      "roans",
      "roars",
      "roary",
      "roate",
      "robed",
      "robes",
      "roble",
      "rocks",
      "roded",
      "rodes",
      "roguy",
      "rohes",
      "roids",
      "roils",
      "roily",
      "roins",
      "roist",
      "rojak",
      "rojis",
      "roked",
      "roker",
      "rokes",
      "rolag",
      "roles",
      "rolfs",
      "rolls",
      "romal",
      "roman",
      "romeo",
      "romps",
      "ronde",
      "rondo",
      "roneo",
      "rones",
      "ronin",
      "ronne",
      "ronte",
      "ronts",
      "roods",
      "roofs",
      "roofy",
      "rooks",
      "rooky",
      "rooms",
      "roons",
      "roops",
      "roopy",
      "roosa",
      "roose",
      "roots",
      "rooty",
      "roped",
      "roper",
      "ropes",
      "ropey",
      "roque",
      "roral",
      "rores",
      "roric",
      "rorid",
      "rorie",
      "rorts",
      "rorty",
      "rosed",
      "roses",
      "roset",
      "roshi",
      "rosin",
      "rosit",
      "rosti",
      "rosts",
      "rotal",
      "rotan",
      "rotas",
      "rotch",
      "roted",
      "rotes",
      "rotis",
      "rotls",
      "roton",
      "rotos",
      "rotte",
      "rouen",
      "roues",
      "roule",
      "rouls",
      "roums",
      "roups",
      "roupy",
      "roust",
      "routh",
      "routs",
      "roved",
      "roven",
      "roves",
      "rowan",
      "rowed",
      "rowel",
      "rowen",
      "rowie",
      "rowme",
      "rownd",
      "rowth",
      "rowts",
      "royne",
      "royst",
      "rozet",
      "rozit",
      "ruana",
      "rubai",
      "rubby",
      "rubel",
      "rubes",
      "rubin",
      "ruble",
      "rubli",
      "rubus",
      "ruche",
      "rucks",
      "rudas",
      "rudds",
      "rudes",
      "rudie",
      "rudis",
      "rueda",
      "ruers",
      "ruffe",
      "ruffs",
      "rugae",
      "rugal",
      "ruggy",
      "ruing",
      "ruins",
      "rukhs",
      "ruled",
      "rules",
      "rumal",
      "rumbo",
      "rumen",
      "rumes",
      "rumly",
      "rummy",
      "rumpo",
      "rumps",
      "rumpy",
      "runch",
      "runds",
      "runed",
      "runes",
      "rungs",
      "runic",
      "runny",
      "runts",
      "runty",
      "rupia",
      "rurps",
      "rurus",
      "rusas",
      "ruses",
      "rushy",
      "rusks",
      "rusma",
      "russe",
      "rusts",
      "ruths",
      "rutin",
      "rutty",
      "ryals",
      "rybat",
      "ryked",
      "rykes",
      "rymme",
      "rynds",
      "ryots",
      "ryper",
      "saags",
      "sabal",
      "sabed",
      "saber",
      "sabes",
      "sabha",
      "sabin",
      "sabir",
      "sable",
      "sabot",
      "sabra",
      "sabre",
      "sacks",
      "sacra",
      "saddo",
      "sades",
      "sadhe",
      "sadhu",
      "sadis",
      "sados",
      "sadza",
      "safed",
      "safes",
      "sagas",
      "sager",
      "sages",
      "saggy",
      "sagos",
      "sagum",
      "saheb",
      "sahib",
      "saice",
      "saick",
      "saics",
      "saids",
      "saiga",
      "sails",
      "saims",
      "saine",
      "sains",
      "sairs",
      "saist",
      "saith",
      "sajou",
      "sakai",
      "saker",
      "sakes",
      "sakia",
      "sakis",
      "sakti",
      "salal",
      "salat",
      "salep",
      "sales",
      "salet",
      "salic",
      "salix",
      "salle",
      "salmi",
      "salol",
      "salop",
      "salpa",
      "salps",
      "salse",
      "salto",
      "salts",
      "salue",
      "salut",
      "saman",
      "samas",
      "samba",
      "sambo",
      "samek",
      "samel",
      "samen",
      "sames",
      "samey",
      "samfu",
      "sammy",
      "sampi",
      "samps",
      "sands",
      "saned",
      "sanes",
      "sanga",
      "sangh",
      "sango",
      "sangs",
      "sanko",
      "sansa",
      "santo",
      "sants",
      "saola",
      "sapan",
      "sapid",
      "sapor",
      "saran",
      "sards",
      "sared",
      "saree",
      "sarge",
      "sargo",
      "sarin",
      "saris",
      "sarks",
      "sarky",
      "sarod",
      "saros",
      "sarus",
      "saser",
      "sasin",
      "sasse",
      "satai",
      "satay",
      "sated",
      "satem",
      "sates",
      "satis",
      "sauba",
      "sauch",
      "saugh",
      "sauls",
      "sault",
      "saunt",
      "saury",
      "sauts",
      "saved",
      "saver",
      "saves",
      "savey",
      "savin",
      "sawah",
      "sawed",
      "sawer",
      "saxes",
      "sayed",
      "sayer",
      "sayid",
      "sayne",
      "sayon",
      "sayst",
      "sazes",
      "scabs",
      "scads",
      "scaff",
      "scags",
      "scail",
      "scala",
      "scall",
      "scams",
      "scand",
      "scans",
      "scapa",
      "scape",
      "scapi",
      "scarp",
      "scars",
      "scart",
      "scath",
      "scats",
      "scatt",
      "scaud",
      "scaup",
      "scaur",
      "scaws",
      "sceat",
      "scena",
      "scend",
      "schav",
      "schmo",
      "schul",
      "schwa",
      "sclim",
      "scody",
      "scogs",
      "scoog",
      "scoot",
      "scopa",
      "scops",
      "scots",
      "scoug",
      "scoup",
      "scowp",
      "scows",
      "scrab",
      "scrae",
      "scrag",
      "scran",
      "scrat",
      "scraw",
      "scray",
      "scrim",
      "scrip",
      "scrob",
      "scrod",
      "scrog",
      "scrow",
      "scudi",
      "scudo",
      "scuds",
      "scuff",
      "scuft",
      "scugs",
      "sculk",
      "scull",
      "sculp",
      "sculs",
      "scums",
      "scups",
      "scurf",
      "scurs",
      "scuse",
      "scuta",
      "scute",
      "scuts",
      "scuzz",
      "scyes",
      "sdayn",
      "sdein",
      "seals",
      "seame",
      "seams",
      "seamy",
      "seans",
      "seare",
      "sears",
      "sease",
      "seats",
      "seaze",
      "sebum",
      "secco",
      "sechs",
      "sects",
      "seder",
      "sedes",
      "sedge",
      "sedgy",
      "sedum",
      "seeds",
      "seeks",
      "seeld",
      "seels",
      "seely",
      "seems",
      "seeps",
      "seepy",
      "seers",
      "sefer",
      "segar",
      "segni",
      "segno",
      "segol",
      "segos",
      "sehri",
      "seifs",
      "seils",
      "seine",
      "seirs",
      "seise",
      "seism",
      "seity",
      "seiza",
      "sekos",
      "sekts",
      "selah",
      "seles",
      "selfs",
      "sella",
      "selle",
      "sells",
      "selva",
      "semee",
      "semes",
      "semie",
      "semis",
      "senas",
      "sends",
      "senes",
      "sengi",
      "senna",
      "senor",
      "sensa",
      "sensi",
      "sente",
      "senti",
      "sents",
      "senvy",
      "senza",
      "sepad",
      "sepal",
      "sepic",
      "sepoy",
      "septa",
      "septs",
      "serac",
      "serai",
      "seral",
      "sered",
      "serer",
      "seres",
      "serfs",
      "serge",
      "seric",
      "serin",
      "serks",
      "seron",
      "serow",
      "serra",
      "serre",
      "serrs",
      "serry",
      "servo",
      "sesey",
      "sessa",
      "setae",
      "setal",
      "seton",
      "setts",
      "sewan",
      "sewar",
      "sewed",
      "sewel",
      "sewen",
      "sewin",
      "sexed",
      "sexer",
      "sexes",
      "sexto",
      "sexts",
      "seyen",
      "shads",
      "shags",
      "shahs",
      "shako",
      "shakt",
      "shalm",
      "shaly",
      "shama",
      "shams",
      "shand",
      "shans",
      "shaps",
      "sharn",
      "shash",
      "shaul",
      "shawm",
      "shawn",
      "shaws",
      "shaya",
      "shays",
      "shchi",
      "sheaf",
      "sheal",
      "sheas",
      "sheds",
      "sheel",
      "shend",
      "shent",
      "sheol",
      "sherd",
      "shere",
      "shero",
      "shets",
      "sheva",
      "shewn",
      "shews",
      "shiai",
      "shiel",
      "shier",
      "shies",
      "shill",
      "shily",
      "shims",
      "shins",
      "ships",
      "shirr",
      "shirs",
      "shish",
      "shiso",
      "shist",
      "shite",
      "shits",
      "shiur",
      "shiva",
      "shive",
      "shivs",
      "shlep",
      "shlub",
      "shmek",
      "shmoe",
      "shoat",
      "shoed",
      "shoer",
      "shoes",
      "shogi",
      "shogs",
      "shoji",
      "shojo",
      "shola",
      "shool",
      "shoon",
      "shoos",
      "shope",
      "shops",
      "shorl",
      "shote",
      "shots",
      "shott",
      "showd",
      "shows",
      "shoyu",
      "shred",
      "shris",
      "shrow",
      "shtik",
      "shtum",
      "shtup",
      "shule",
      "shuln",
      "shuls",
      "shuns",
      "shura",
      "shute",
      "shuts",
      "shwas",
      "shyer",
      "sials",
      "sibbs",
      "sibyl",
      "sices",
      "sicht",
      "sicko",
      "sicks",
      "sicky",
      "sidas",
      "sided",
      "sider",
      "sides",
      "sidha",
      "sidhe",
      "sidle",
      "sield",
      "siens",
      "sient",
      "sieth",
      "sieur",
      "sifts",
      "sighs",
      "sigil",
      "sigla",
      "signa",
      "signs",
      "sijos",
      "sikas",
      "siker",
      "sikes",
      "silds",
      "siled",
      "silen",
      "siler",
      "siles",
      "silex",
      "silks",
      "sills",
      "silos",
      "silts",
      "silty",
      "silva",
      "simar",
      "simas",
      "simba",
      "simis",
      "simps",
      "simul",
      "sinds",
      "sined",
      "sines",
      "sings",
      "sinhs",
      "sinks",
      "sinky",
      "sinus",
      "siped",
      "sipes",
      "sippy",
      "sired",
      "siree",
      "sires",
      "sirih",
      "siris",
      "siroc",
      "sirra",
      "sirup",
      "sisal",
      "sises",
      "sista",
      "sists",
      "sitar",
      "sited",
      "sites",
      "sithe",
      "sitka",
      "situp",
      "situs",
      "siver",
      "sixer",
      "sixes",
      "sixmo",
      "sixte",
      "sizar",
      "sized",
      "sizel",
      "sizer",
      "sizes",
      "skags",
      "skail",
      "skald",
      "skank",
      "skart",
      "skats",
      "skatt",
      "skaws",
      "skean",
      "skear",
      "skeds",
      "skeed",
      "skeef",
      "skeen",
      "skeer",
      "skees",
      "skeet",
      "skegg",
      "skegs",
      "skein",
      "skelf",
      "skell",
      "skelm",
      "skelp",
      "skene",
      "skens",
      "skeos",
      "skeps",
      "skers",
      "skets",
      "skews",
      "skids",
      "skied",
      "skies",
      "skiey",
      "skimo",
      "skims",
      "skink",
      "skins",
      "skint",
      "skios",
      "skips",
      "skirl",
      "skirr",
      "skite",
      "skits",
      "skive",
      "skivy",
      "sklim",
      "skoal",
      "skody",
      "skoff",
      "skogs",
      "skols",
      "skool",
      "skort",
      "skosh",
      "skran",
      "skrik",
      "skuas",
      "skugs",
      "skyed",
      "skyer",
      "skyey",
      "skyfs",
      "skyre",
      "skyrs",
      "skyte",
      "slabs",
      "slade",
      "slaes",
      "slags",
      "slaid",
      "slake",
      "slams",
      "slane",
      "slank",
      "slaps",
      "slart",
      "slats",
      "slaty",
      "slaws",
      "slays",
      "slebs",
      "sleds",
      "sleer",
      "slews",
      "sleys",
      "slier",
      "slily",
      "slims",
      "slipe",
      "slips",
      "slipt",
      "slish",
      "slits",
      "slive",
      "sloan",
      "slobs",
      "sloes",
      "slogs",
      "sloid",
      "slojd",
      "slomo",
      "sloom",
      "sloot",
      "slops",
      "slopy",
      "slorm",
      "slots",
      "slove",
      "slows",
      "sloyd",
      "slubb",
      "slubs",
      "slued",
      "slues",
      "sluff",
      "slugs",
      "sluit",
      "slums",
      "slurb",
      "slurs",
      "sluse",
      "sluts",
      "slyer",
      "slype",
      "smaak",
      "smaik",
      "smalm",
      "smalt",
      "smarm",
      "smaze",
      "smeek",
      "smees",
      "smeik",
      "smeke",
      "smerk",
      "smews",
      "smirr",
      "smirs",
      "smits",
      "smogs",
      "smoko",
      "smolt",
      "smoor",
      "smoot",
      "smore",
      "smorg",
      "smout",
      "smowt",
      "smugs",
      "smurs",
      "smush",
      "smuts",
      "snabs",
      "snafu",
      "snags",
      "snaps",
      "snarf",
      "snark",
      "snars",
      "snary",
      "snash",
      "snath",
      "snaws",
      "snead",
      "sneap",
      "snebs",
      "sneck",
      "sneds",
      "sneed",
      "snees",
      "snell",
      "snibs",
      "snick",
      "snies",
      "snift",
      "snigs",
      "snips",
      "snipy",
      "snirt",
      "snits",
      "snobs",
      "snods",
      "snoek",
      "snoep",
      "snogs",
      "snoke",
      "snood",
      "snook",
      "snool",
      "snoot",
      "snots",
      "snowk",
      "snows",
      "snubs",
      "snugs",
      "snush",
      "snyes",
      "soaks",
      "soaps",
      "soare",
      "soars",
      "soave",
      "sobas",
      "socas",
      "soces",
      "socko",
      "socks",
      "socle",
      "sodas",
      "soddy",
      "sodic",
      "sodom",
      "sofar",
      "sofas",
      "softa",
      "softs",
      "softy",
      "soger",
      "sohur",
      "soils",
      "soily",
      "sojas",
      "sojus",
      "sokah",
      "soken",
      "sokes",
      "sokol",
      "solah",
      "solan",
      "solas",
      "solde",
      "soldi",
      "soldo",
      "solds",
      "soled",
      "solei",
      "soler",
      "soles",
      "solon",
      "solos",
      "solum",
      "solus",
      "soman",
      "somas",
      "sonce",
      "sonde",
      "sones",
      "songs",
      "sonly",
      "sonne",
      "sonny",
      "sonse",
      "sonsy",
      "sooey",
      "sooks",
      "sooky",
      "soole",
      "sools",
      "sooms",
      "soops",
      "soote",
      "soots",
      "sophs",
      "sophy",
      "sopor",
      "soppy",
      "sopra",
      "soral",
      "soras",
      "sorbo",
      "sorbs",
      "sorda",
      "sordo",
      "sords",
      "sored",
      "soree",
      "sorel",
      "sorer",
      "sores",
      "sorex",
      "sorgo",
      "sorns",
      "sorra",
      "sorta",
      "sorts",
      "sorus",
      "soths",
      "sotol",
      "souce",
      "souct",
      "sough",
      "souks",
      "souls",
      "soums",
      "soups",
      "soupy",
      "sours",
      "souse",
      "souts",
      "sowar",
      "sowce",
      "sowed",
      "sowff",
      "sowfs",
      "sowle",
      "sowls",
      "sowms",
      "sownd",
      "sowne",
      "sowps",
      "sowse",
      "sowth",
      "soyas",
      "soyle",
      "soyuz",
      "sozin",
      "spacy",
      "spado",
      "spaed",
      "spaer",
      "spaes",
      "spags",
      "spahi",
      "spail",
      "spain",
      "spait",
      "spake",
      "spald",
      "spale",
      "spall",
      "spalt",
      "spams",
      "spane",
      "spang",
      "spans",
      "spard",
      "spars",
      "spart",
      "spate",
      "spats",
      "spaul",
      "spawl",
      "spaws",
      "spayd",
      "spays",
      "spaza",
      "spazz",
      "speal",
      "spean",
      "speat",
      "specs",
      "spect",
      "speel",
      "speer",
      "speil",
      "speir",
      "speks",
      "speld",
      "spelk",
      "speos",
      "spets",
      "speug",
      "spews",
      "spewy",
      "spial",
      "spica",
      "spick",
      "spics",
      "spide",
      "spier",
      "spies",
      "spiff",
      "spifs",
      "spiks",
      "spile",
      "spims",
      "spina",
      "spink",
      "spins",
      "spirt",
      "spiry",
      "spits",
      "spitz",
      "spivs",
      "splay",
      "splog",
      "spode",
      "spods",
      "spoom",
      "spoor",
      "spoot",
      "spork",
      "sposh",
      "spots",
      "sprad",
      "sprag",
      "sprat",
      "spred",
      "sprew",
      "sprit",
      "sprod",
      "sprog",
      "sprue",
      "sprug",
      "spuds",
      "spued",
      "spuer",
      "spues",
      "spugs",
      "spule",
      "spume",
      "spumy",
      "spurs",
      "sputa",
      "spyal",
      "spyre",
      "squab",
      "squaw",
      "squeg",
      "squid",
      "squit",
      "squiz",
      "stabs",
      "stade",
      "stags",
      "stagy",
      "staig",
      "stane",
      "stang",
      "staph",
      "staps",
      "starn",
      "starr",
      "stars",
      "stats",
      "staun",
      "staws",
      "stays",
      "stean",
      "stear",
      "stedd",
      "stede",
      "steds",
      "steek",
      "steem",
      "steen",
      "steil",
      "stela",
      "stele",
      "stell",
      "steme",
      "stems",
      "stend",
      "steno",
      "stens",
      "stent",
      "steps",
      "stept",
      "stere",
      "stets",
      "stews",
      "stewy",
      "steys",
      "stich",
      "stied",
      "sties",
      "stilb",
      "stile",
      "stime",
      "stims",
      "stimy",
      "stipa",
      "stipe",
      "stire",
      "stirk",
      "stirp",
      "stirs",
      "stive",
      "stivy",
      "stoae",
      "stoai",
      "stoas",
      "stoat",
      "stobs",
      "stoep",
      "stogy",
      "stoit",
      "stoln",
      "stoma",
      "stond",
      "stong",
      "stonk",
      "stonn",
      "stook",
      "stoor",
      "stope",
      "stops",
      "stopt",
      "stoss",
      "stots",
      "stott",
      "stoun",
      "stoup",
      "stour",
      "stown",
      "stowp",
      "stows",
      "strad",
      "strae",
      "strag",
      "strak",
      "strep",
      "strew",
      "stria",
      "strig",
      "strim",
      "strop",
      "strow",
      "stroy",
      "strum",
      "stubs",
      "stude",
      "studs",
      "stull",
      "stulm",
      "stumm",
      "stums",
      "stuns",
      "stupa",
      "stupe",
      "sture",
      "sturt",
      "styed",
      "styes",
      "styli",
      "stylo",
      "styme",
      "stymy",
      "styre",
      "styte",
      "subah",
      "subas",
      "subby",
      "suber",
      "subha",
      "succi",
      "sucks",
      "sucky",
      "sucre",
      "sudds",
      "sudor",
      "sudsy",
      "suede",
      "suent",
      "suers",
      "suete",
      "suets",
      "suety",
      "sugan",
      "sughs",
      "sugos",
      "suhur",
      "suids",
      "suint",
      "suits",
      "sujee",
      "sukhs",
      "sukuk",
      "sulci",
      "sulfa",
      "sulfo",
      "sulks",
      "sulph",
      "sulus",
      "sumis",
      "summa",
      "sumos",
      "sumph",
      "sumps",
      "sunis",
      "sunks",
      "sunna",
      "sunns",
      "sunup",
      "supes",
      "supra",
      "surah",
      "sural",
      "suras",
      "surat",
      "surds",
      "sured",
      "sures",
      "surfs",
      "surfy",
      "surgy",
      "surra",
      "sused",
      "suses",
      "susus",
      "sutor",
      "sutra",
      "sutta",
      "swabs",
      "swack",
      "swads",
      "swage",
      "swags",
      "swail",
      "swain",
      "swale",
      "swaly",
      "swamy",
      "swang",
      "swank",
      "swans",
      "swaps",
      "swapt",
      "sward",
      "sware",
      "swarf",
      "swart",
      "swats",
      "swayl",
      "sways",
      "sweal",
      "swede",
      "sweed",
      "sweel",
      "sweer",
      "swees",
      "sweir",
      "swelt",
      "swerf",
      "sweys",
      "swies",
      "swigs",
      "swile",
      "swims",
      "swink",
      "swipe",
      "swire",
      "swiss",
      "swith",
      "swits",
      "swive",
      "swizz",
      "swobs",
      "swole",
      "swoln",
      "swops",
      "swopt",
      "swots",
      "swoun",
      "sybbe",
      "sybil",
      "syboe",
      "sybow",
      "sycee",
      "syces",
      "sycon",
      "syens",
      "syker",
      "sykes",
      "sylis",
      "sylph",
      "sylva",
      "symar",
      "synch",
      "syncs",
      "synds",
      "syned",
      "synes",
      "synth",
      "syped",
      "sypes",
      "syphs",
      "syrah",
      "syren",
      "sysop",
      "sythe",
      "syver",
      "taals",
      "taata",
      "taber",
      "tabes",
      "tabid",
      "tabis",
      "tabla",
      "tabor",
      "tabun",
      "tabus",
      "tacan",
      "taces",
      "tacet",
      "tache",
      "tacho",
      "tachs",
      "tacks",
      "tacos",
      "tacts",
      "taels",
      "tafia",
      "taggy",
      "tagma",
      "tahas",
      "tahrs",
      "taiga",
      "taigs",
      "taiko",
      "tails",
      "tains",
      "taira",
      "taish",
      "taits",
      "tajes",
      "takas",
      "takes",
      "takhi",
      "takin",
      "takis",
      "takky",
      "talak",
      "talaq",
      "talar",
      "talas",
      "talcs",
      "talcy",
      "talea",
      "taler",
      "tales",
      "talks",
      "talky",
      "talls",
      "talma",
      "talpa",
      "taluk",
      "talus",
      "tamal",
      "tamed",
      "tames",
      "tamin",
      "tamis",
      "tammy",
      "tamps",
      "tanas",
      "tanga",
      "tangi",
      "tangs",
      "tanhs",
      "tanka",
      "tanks",
      "tanky",
      "tanna",
      "tansy",
      "tanti",
      "tanto",
      "tanty",
      "tapas",
      "taped",
      "tapen",
      "tapes",
      "tapet",
      "tapis",
      "tappa",
      "tapus",
      "taras",
      "tardo",
      "tared",
      "tares",
      "targa",
      "targe",
      "tarns",
      "taroc",
      "tarok",
      "taros",
      "tarps",
      "tarre",
      "tarry",
      "tarsi",
      "tarts",
      "tarty",
      "tasar",
      "tased",
      "taser",
      "tases",
      "tasks",
      "tassa",
      "tasse",
      "tasso",
      "tatar",
      "tater",
      "tates",
      "taths",
      "tatie",
      "tatou",
      "tatts",
      "tatus",
      "taube",
      "tauld",
      "tauon",
      "taupe",
      "tauts",
      "tavah",
      "tavas",
      "taver",
      "tawai",
      "tawas",
      "tawed",
      "tawer",
      "tawie",
      "tawse",
      "tawts",
      "taxed",
      "taxer",
      "taxes",
      "taxis",
      "taxol",
      "taxon",
      "taxor",
      "taxus",
      "tayra",
      "tazza",
      "tazze",
      "teade",
      "teads",
      "teaed",
      "teaks",
      "teals",
      "teams",
      "tears",
      "teats",
      "teaze",
      "techs",
      "techy",
      "tecta",
      "teels",
      "teems",
      "teend",
      "teene",
      "teens",
      "teeny",
      "teers",
      "teffs",
      "teggs",
      "tegua",
      "tegus",
      "tehrs",
      "teiid",
      "teils",
      "teind",
      "teins",
      "telae",
      "telco",
      "teles",
      "telex",
      "telia",
      "telic",
      "tells",
      "telly",
      "teloi",
      "telos",
      "temed",
      "temes",
      "tempi",
      "temps",
      "tempt",
      "temse",
      "tench",
      "tends",
      "tendu",
      "tenes",
      "tenge",
      "tenia",
      "tenne",
      "tenno",
      "tenny",
      "tenon",
      "tents",
      "tenty",
      "tenue",
      "tepal",
      "tepas",
      "tepoy",
      "terai",
      "teras",
      "terce",
      "terek",
      "teres",
      "terfe",
      "terfs",
      "terga",
      "terms",
      "terne",
      "terns",
      "terry",
      "terts",
      "tesla",
      "testa",
      "teste",
      "tests",
      "tetes",
      "teths",
      "tetra",
      "tetri",
      "teuch",
      "teugh",
      "tewed",
      "tewel",
      "tewit",
      "texas",
      "texes",
      "texts",
      "thack",
      "thagi",
      "thaim",
      "thale",
      "thali",
      "thana",
      "thane",
      "thang",
      "thans",
      "thanx",
      "tharm",
      "thars",
      "thaws",
      "thawy",
      "thebe",
      "theca",
      "theed",
      "theek",
      "thees",
      "thegn",
      "theic",
      "thein",
      "thelf",
      "thema",
      "thens",
      "theow",
      "therm",
      "thesp",
      "thete",
      "thews",
      "thewy",
      "thigs",
      "thilk",
      "thill",
      "thine",
      "thins",
      "thiol",
      "thirl",
      "thoft",
      "thole",
      "tholi",
      "thoro",
      "thorp",
      "thous",
      "thowl",
      "thrae",
      "thraw",
      "thrid",
      "thrip",
      "throe",
      "thuds",
      "thugs",
      "thuja",
      "thunk",
      "thurl",
      "thuya",
      "thymi",
      "thymy",
      "tians",
      "tiars",
      "tical",
      "ticca",
      "ticed",
      "tices",
      "tichy",
      "ticks",
      "ticky",
      "tiddy",
      "tided",
      "tides",
      "tiers",
      "tiffs",
      "tifos",
      "tifts",
      "tiges",
      "tigon",
      "tikas",
      "tikes",
      "tikis",
      "tikka",
      "tilak",
      "tiled",
      "tiler",
      "tiles",
      "tills",
      "tilly",
      "tilth",
      "tilts",
      "timbo",
      "timed",
      "times",
      "timon",
      "timps",
      "tinas",
      "tinct",
      "tinds",
      "tinea",
      "tined",
      "tines",
      "tinge",
      "tings",
      "tinks",
      "tinny",
      "tints",
      "tinty",
      "tipis",
      "tippy",
      "tired",
      "tires",
      "tirls",
      "tiros",
      "tirrs",
      "titch",
      "titer",
      "titis",
      "titre",
      "titty",
      "titup",
      "tiyin",
      "tiyns",
      "tizes",
      "tizzy",
      "toads",
      "toady",
      "toaze",
      "tocks",
      "tocky",
      "tocos",
      "todde",
      "toeas",
      "toffs",
      "toffy",
      "tofts",
      "tofus",
      "togae",
      "togas",
      "toged",
      "toges",
      "togue",
      "tohos",
      "toile",
      "toils",
      "toing",
      "toise",
      "toits",
      "tokay",
      "toked",
      "toker",
      "tokes",
      "tokos",
      "tolan",
      "tolar",
      "tolas",
      "toled",
      "toles",
      "tolls",
      "tolly",
      "tolts",
      "tolus",
      "tolyl",
      "toman",
      "tombs",
      "tomes",
      "tomia",
      "tommy",
      "tomos",
      "tondi",
      "tondo",
      "toned",
      "toner",
      "tones",
      "toney",
      "tongs",
      "tonka",
      "tonks",
      "tonne",
      "tonus",
      "tools",
      "tooms",
      "toons",
      "toots",
      "toped",
      "topee",
      "topek",
      "toper",
      "topes",
      "tophe",
      "tophi",
      "tophs",
      "topis",
      "topoi",
      "topos",
      "toppy",
      "toque",
      "torah",
      "toran",
      "toras",
      "torcs",
      "tores",
      "toric",
      "torii",
      "toros",
      "torot",
      "torrs",
      "torse",
      "torsi",
      "torsk",
      "torta",
      "torte",
      "torts",
      "tosas",
      "tosed",
      "toses",
      "toshy",
      "tossy",
      "toted",
      "toter",
      "totes",
      "totty",
      "touks",
      "touns",
      "tours",
      "touse",
      "tousy",
      "touts",
      "touze",
      "touzy",
      "towed",
      "towie",
      "towns",
      "towny",
      "towse",
      "towsy",
      "towts",
      "towze",
      "towzy",
      "toyed",
      "toyer",
      "toyon",
      "toyos",
      "tozed",
      "tozes",
      "tozie",
      "trabs",
      "trads",
      "tragi",
      "traik",
      "trams",
      "trank",
      "tranq",
      "trans",
      "trant",
      "trape",
      "traps",
      "trapt",
      "trass",
      "trats",
      "tratt",
      "trave",
      "trayf",
      "trays",
      "treck",
      "treed",
      "treen",
      "trees",
      "trefa",
      "treif",
      "treks",
      "trema",
      "trems",
      "tress",
      "trest",
      "trets",
      "trews",
      "treyf",
      "treys",
      "triac",
      "tride",
      "trier",
      "tries",
      "triff",
      "trigo",
      "trigs",
      "trike",
      "trild",
      "trill",
      "trims",
      "trine",
      "trins",
      "triol",
      "trior",
      "trios",
      "trips",
      "tripy",
      "trist",
      "troad",
      "troak",
      "troat",
      "trock",
      "trode",
      "trods",
      "trogs",
      "trois",
      "troke",
      "tromp",
      "trona",
      "tronc",
      "trone",
      "tronk",
      "trons",
      "trooz",
      "troth",
      "trots",
      "trows",
      "troys",
      "trued",
      "trues",
      "trugo",
      "trugs",
      "trull",
      "tryer",
      "tryke",
      "tryma",
      "tryps",
      "tsade",
      "tsadi",
      "tsars",
      "tsked",
      "tsuba",
      "tsubo",
      "tuans",
      "tuart",
      "tuath",
      "tubae",
      "tubar",
      "tubas",
      "tubby",
      "tubed",
      "tubes",
      "tucks",
      "tufas",
      "tuffe",
      "tuffs",
      "tufts",
      "tufty",
      "tugra",
      "tuile",
      "tuina",
      "tuism",
      "tuktu",
      "tules",
      "tulpa",
      "tulsi",
      "tumid",
      "tummy",
      "tumps",
      "tumpy",
      "tunas",
      "tunds",
      "tuned",
      "tuner",
      "tunes",
      "tungs",
      "tunny",
      "tupek",
      "tupik",
      "tuple",
      "tuque",
      "turds",
      "turfs",
      "turfy",
      "turks",
      "turme",
      "turms",
      "turns",
      "turnt",
      "turps",
      "turrs",
      "tushy",
      "tusks",
      "tusky",
      "tutee",
      "tutti",
      "tutty",
      "tutus",
      "tuxes",
      "tuyer",
      "twaes",
      "twain",
      "twals",
      "twank",
      "twats",
      "tways",
      "tweel",
      "tween",
      "tweep",
      "tweer",
      "twerk",
      "twerp",
      "twier",
      "twigs",
      "twill",
      "twilt",
      "twink",
      "twins",
      "twiny",
      "twire",
      "twirp",
      "twite",
      "twits",
      "twoer",
      "twyer",
      "tyees",
      "tyers",
      "tyiyn",
      "tykes",
      "tyler",
      "tymps",
      "tynde",
      "tyned",
      "tynes",
      "typal",
      "typed",
      "types",
      "typey",
      "typic",
      "typos",
      "typps",
      "typto",
      "tyran",
      "tyred",
      "tyres",
      "tyros",
      "tythe",
      "tzars",
      "udals",
      "udons",
      "ugali",
      "ugged",
      "uhlan",
      "uhuru",
      "ukase",
      "ulama",
      "ulans",
      "ulema",
      "ulmin",
      "ulnad",
      "ulnae",
      "ulnar",
      "ulnas",
      "ulpan",
      "ulvas",
      "ulyie",
      "ulzie",
      "umami",
      "umbel",
      "umber",
      "umble",
      "umbos",
      "umbre",
      "umiac",
      "umiak",
      "umiaq",
      "ummah",
      "ummas",
      "ummed",
      "umped",
      "umphs",
      "umpie",
      "umpty",
      "umrah",
      "umras",
      "unais",
      "unapt",
      "unarm",
      "unary",
      "unaus",
      "unbag",
      "unban",
      "unbar",
      "unbed",
      "unbid",
      "unbox",
      "uncap",
      "unces",
      "uncia",
      "uncos",
      "uncoy",
      "uncus",
      "undam",
      "undee",
      "undos",
      "undug",
      "uneth",
      "unfix",
      "ungag",
      "unget",
      "ungod",
      "ungot",
      "ungum",
      "unhat",
      "unhip",
      "unica",
      "units",
      "unjam",
      "unked",
      "unket",
      "unkid",
      "unlaw",
      "unlay",
      "unled",
      "unlet",
      "unlid",
      "unman",
      "unmew",
      "unmix",
      "unpay",
      "unpeg",
      "unpen",
      "unpin",
      "unred",
      "unrid",
      "unrig",
      "unrip",
      "unsaw",
      "unsay",
      "unsee",
      "unsew",
      "unsex",
      "unsod",
      "untax",
      "untin",
      "unwet",
      "unwit",
      "unwon",
      "upbow",
      "upbye",
      "updos",
      "updry",
      "upend",
      "upjet",
      "uplay",
      "upled",
      "uplit",
      "upped",
      "upran",
      "uprun",
      "upsee",
      "upsey",
      "uptak",
      "upter",
      "uptie",
      "uraei",
      "urali",
      "uraos",
      "urare",
      "urari",
      "urase",
      "urate",
      "urbex",
      "urbia",
      "urdee",
      "ureal",
      "ureas",
      "uredo",
      "ureic",
      "urena",
      "urent",
      "urged",
      "urger",
      "urges",
      "urial",
      "urite",
      "urman",
      "urnal",
      "urned",
      "urped",
      "ursae",
      "ursid",
      "urson",
      "urubu",
      "urvas",
      "users",
      "usnea",
      "usque",
      "usure",
      "usury",
      "uteri",
      "uveal",
      "uveas",
      "uvula",
      "vacua",
      "vaded",
      "vades",
      "vagal",
      "vagus",
      "vails",
      "vaire",
      "vairs",
      "vairy",
      "vakas",
      "vakil",
      "vales",
      "valis",
      "valse",
      "vamps",
      "vampy",
      "vanda",
      "vaned",
      "vanes",
      "vangs",
      "vants",
      "vaped",
      "vaper",
      "vapes",
      "varan",
      "varas",
      "vardy",
      "varec",
      "vares",
      "varia",
      "varix",
      "varna",
      "varus",
      "varve",
      "vasal",
      "vases",
      "vasts",
      "vasty",
      "vatic",
      "vatus",
      "vauch",
      "vaute",
      "vauts",
      "vawte",
      "vaxes",
      "veale",
      "veals",
      "vealy",
      "veena",
      "veeps",
      "veers",
      "veery",
      "vegas",
      "veges",
      "vegie",
      "vegos",
      "vehme",
      "veils",
      "veily",
      "veins",
      "veiny",
      "velar",
      "velds",
      "veldt",
      "veles",
      "vells",
      "velum",
      "venae",
      "venal",
      "vends",
      "vendu",
      "veney",
      "venge",
      "venin",
      "vents",
      "venus",
      "verbs",
      "verra",
      "verry",
      "verst",
      "verts",
      "vertu",
      "vespa",
      "vesta",
      "vests",
      "vetch",
      "vexed",
      "vexer",
      "vexes",
      "vexil",
      "vezir",
      "vials",
      "viand",
      "vibes",
      "vibex",
      "vibey",
      "viced",
      "vices",
      "vichy",
      "viers",
      "views",
      "viewy",
      "vifda",
      "viffs",
      "vigas",
      "vigia",
      "vilde",
      "viler",
      "villi",
      "vills",
      "vimen",
      "vinal",
      "vinas",
      "vinca",
      "vined",
      "viner",
      "vines",
      "vinew",
      "vinic",
      "vinos",
      "vints",
      "viold",
      "viols",
      "vired",
      "vireo",
      "vires",
      "virga",
      "virge",
      "virid",
      "virls",
      "virtu",
      "visas",
      "vised",
      "vises",
      "visie",
      "visne",
      "vison",
      "visto",
      "vitae",
      "vitas",
      "vitex",
      "vitro",
      "vitta",
      "vivas",
      "vivat",
      "vivda",
      "viver",
      "vives",
      "vizir",
      "vizor",
      "vleis",
      "vlies",
      "vlogs",
      "voars",
      "vocab",
      "voces",
      "voddy",
      "vodou",
      "vodun",
      "voema",
      "vogie",
      "voids",
      "voile",
      "voips",
      "volae",
      "volar",
      "voled",
      "voles",
      "volet",
      "volks",
      "volta",
      "volte",
      "volti",
      "volts",
      "volva",
      "volve",
      "vomer",
      "voted",
      "votes",
      "vouge",
      "voulu",
      "vowed",
      "vower",
      "voxel",
      "vozhd",
      "vraic",
      "vrils",
      "vroom",
      "vrous",
      "vrouw",
      "vrows",
      "vuggs",
      "vuggy",
      "vughs",
      "vughy",
      "vulgo",
      "vulns",
      "vulva",
      "vutty",
      "waacs",
      "wacke",
      "wacko",
      "wacks",
      "wadds",
      "waddy",
      "waded",
      "wader",
      "wades",
      "wadge",
      "wadis",
      "wadts",
      "waffs",
      "wafts",
      "waged",
      "wages",
      "wagga",
      "wagyu",
      "wahoo",
      "waide",
      "waifs",
      "waift",
      "wails",
      "wains",
      "wairs",
      "waite",
      "waits",
      "wakas",
      "waked",
      "waken",
      "waker",
      "wakes",
      "wakfs",
      "waldo",
      "walds",
      "waled",
      "waler",
      "wales",
      "walie",
      "walis",
      "walks",
      "walla",
      "walls",
      "wally",
      "walty",
      "wamed",
      "wames",
      "wamus",
      "wands",
      "waned",
      "wanes",
      "waney",
      "wangs",
      "wanks",
      "wanky",
      "wanle",
      "wanly",
      "wanna",
      "wants",
      "wanty",
      "wanze",
      "waqfs",
      "warbs",
      "warby",
      "wards",
      "wared",
      "wares",
      "warez",
      "warks",
      "warms",
      "warns",
      "warps",
      "warre",
      "warst",
      "warts",
      "wases",
      "washy",
      "wasms",
      "wasps",
      "waspy",
      "wasts",
      "watap",
      "watts",
      "wauff",
      "waugh",
      "wauks",
      "waulk",
      "wauls",
      "waurs",
      "waved",
      "waves",
      "wavey",
      "wawas",
      "wawes",
      "wawls",
      "waxed",
      "waxer",
      "waxes",
      "wayed",
      "wazir",
      "wazoo",
      "weald",
      "weals",
      "weamb",
      "weans",
      "wears",
      "webby",
      "weber",
      "wecht",
      "wedel",
      "wedgy",
      "weeds",
      "weeke",
      "weeks",
      "weels",
      "weems",
      "weens",
      "weeny",
      "weeps",
      "weepy",
      "weest",
      "weete",
      "weets",
      "wefte",
      "wefts",
      "weids",
      "weils",
      "weirs",
      "weise",
      "weize",
      "wekas",
      "welds",
      "welke",
      "welks",
      "welkt",
      "wells",
      "welly",
      "welts",
      "wembs",
      "wends",
      "wenge",
      "wenny",
      "wents",
      "weros",
      "wersh",
      "wests",
      "wetas",
      "wetly",
      "wexed",
      "wexes",
      "whamo",
      "whams",
      "whang",
      "whaps",
      "whare",
      "whata",
      "whats",
      "whaup",
      "whaur",
      "wheal",
      "whear",
      "wheen",
      "wheep",
      "wheft",
      "whelk",
      "whelm",
      "whens",
      "whets",
      "whews",
      "wheys",
      "whids",
      "whift",
      "whigs",
      "whilk",
      "whims",
      "whins",
      "whios",
      "whips",
      "whipt",
      "whirr",
      "whirs",
      "whish",
      "whiss",
      "whist",
      "whits",
      "whity",
      "whizz",
      "whomp",
      "whoof",
      "whoot",
      "whops",
      "whore",
      "whorl",
      "whort",
      "whoso",
      "whows",
      "whump",
      "whups",
      "whyda",
      "wicca",
      "wicks",
      "wicky",
      "widdy",
      "wides",
      "wiels",
      "wifed",
      "wifes",
      "wifey",
      "wifie",
      "wifty",
      "wigan",
      "wigga",
      "wiggy",
      "wikis",
      "wilco",
      "wilds",
      "wiled",
      "wiles",
      "wilga",
      "wilis",
      "wilja",
      "wills",
      "wilts",
      "wimps",
      "winds",
      "wined",
      "wines",
      "winey",
      "winge",
      "wings",
      "wingy",
      "winks",
      "winna",
      "winns",
      "winos",
      "winze",
      "wiped",
      "wiper",
      "wipes",
      "wired",
      "wirer",
      "wires",
      "wirra",
      "wised",
      "wises",
      "wisha",
      "wisht",
      "wisps",
      "wists",
      "witan",
      "wited",
      "wites",
      "withe",
      "withs",
      "withy",
      "wived",
      "wiver",
      "wives",
      "wizen",
      "wizes",
      "woads",
      "woald",
      "wocks",
      "wodge",
      "woful",
      "wojus",
      "woker",
      "wokka",
      "wolds",
      "wolfs",
      "wolly",
      "wolve",
      "wombs",
      "womby",
      "womyn",
      "wonga",
      "wongi",
      "wonks",
      "wonky",
      "wonts",
      "woods",
      "wooed",
      "woofs",
      "woofy",
      "woold",
      "wools",
      "woons",
      "woops",
      "woopy",
      "woose",
      "woosh",
      "wootz",
      "words",
      "works",
      "worms",
      "wormy",
      "worts",
      "wowed",
      "wowee",
      "woxen",
      "wrang",
      "wraps",
      "wrapt",
      "wrast",
      "wrate",
      "wrawl",
      "wrens",
      "wrick",
      "wried",
      "wrier",
      "wries",
      "writs",
      "wroke",
      "wroot",
      "wroth",
      "wryer",
      "wuddy",
      "wudus",
      "wulls",
      "wurst",
      "wuses",
      "wushu",
      "wussy",
      "wuxia",
      "wyled",
      "wyles",
      "wynds",
      "wynns",
      "wyted",
      "wytes",
      "xebec",
      "xenia",
      "xenic",
      "xenon",
      "xeric",
      "xerox",
      "xerus",
      "xoana",
      "xrays",
      "xylan",
      "xylem",
      "xylic",
      "xylol",
      "xylyl",
      "xysti",
      "xysts",
      "yaars",
      "yabas",
      "yabba",
      "yabby",
      "yacca",
      "yacka",
      "yacks",
      "yaffs",
      "yager",
      "yages",
      "yagis",
      "yahoo",
      "yaird",
      "yakka",
      "yakow",
      "yales",
      "yamen",
      "yampy",
      "yamun",
      "yangs",
      "yanks",
      "yapok",
      "yapon",
      "yapps",
      "yappy",
      "yarak",
      "yarco",
      "yards",
      "yarer",
      "yarfa",
      "yarks",
      "yarns",
      "yarrs",
      "yarta",
      "yarto",
      "yates",
      "yauds",
      "yauld",
      "yaups",
      "yawed",
      "yawey",
      "yawls",
      "yawns",
      "yawny",
      "yawps",
      "ybore",
      "yclad",
      "ycled",
      "ycond",
      "ydrad",
      "ydred",
      "yeads",
      "yeahs",
      "yealm",
      "yeans",
      "yeard",
      "years",
      "yecch",
      "yechs",
      "yechy",
      "yedes",
      "yeeds",
      "yeesh",
      "yeggs",
      "yelks",
      "yells",
      "yelms",
      "yelps",
      "yelts",
      "yenta",
      "yente",
      "yerba",
      "yerds",
      "yerks",
      "yeses",
      "yesks",
      "yests",
      "yesty",
      "yetis",
      "yetts",
      "yeuks",
      "yeuky",
      "yeven",
      "yeves",
      "yewen",
      "yexed",
      "yexes",
      "yfere",
      "yiked",
      "yikes",
      "yills",
      "yince",
      "yipes",
      "yippy",
      "yirds",
      "yirks",
      "yirrs",
      "yirth",
      "yites",
      "yitie",
      "ylems",
      "ylike",
      "ylkes",
      "ymolt",
      "ympes",
      "yobbo",
      "yobby",
      "yocks",
      "yodel",
      "yodhs",
      "yodle",
      "yogas",
      "yogee",
      "yoghs",
      "yogic",
      "yogin",
      "yogis",
      "yoick",
      "yojan",
      "yoked",
      "yokel",
      "yoker",
      "yokes",
      "yokul",
      "yolks",
      "yolky",
      "yomim",
      "yomps",
      "yonic",
      "yonis",
      "yonks",
      "yoofs",
      "yoops",
      "yores",
      "yorks",
      "yorps",
      "youks",
      "yourn",
      "yours",
      "yourt",
      "youse",
      "yowed",
      "yowes",
      "yowie",
      "yowls",
      "yowza",
      "yrapt",
      "yrent",
      "yrivd",
      "yrneh",
      "ysame",
      "ytost",
      "yuans",
      "yucas",
      "yucca",
      "yucch",
      "yucko",
      "yucks",
      "yucky",
      "yufts",
      "yugas",
      "yuked",
      "yukes",
      "yukky",
      "yukos",
      "yulan",
      "yules",
      "yummo",
      "yummy",
      "yumps",
      "yupon",
      "yuppy",
      "yurta",
      "yurts",
      "yuzus",
      "zabra",
      "zacks",
      "zaida",
      "zaidy",
      "zaire",
      "zakat",
      "zaman",
      "zambo",
      "zamia",
      "zanja",
      "zante",
      "zanza",
      "zanze",
      "zappy",
      "zarfs",
      "zaris",
      "zatis",
      "zaxes",
      "zayin",
      "zazen",
      "zeals",
      "zebec",
      "zebub",
      "zebus",
      "zedas",
      "zeins",
      "zendo",
      "zerda",
      "zerks",
      "zeros",
      "zests",
      "zetas",
      "zexes",
      "zezes",
      "zhomo",
      "zibet",
      "ziffs",
      "zigan",
      "zilas",
      "zilch",
      "zilla",
      "zills",
      "zimbi",
      "zimbs",
      "zinco",
      "zincs",
      "zincy",
      "zineb",
      "zines",
      "zings",
      "zingy",
      "zinke",
      "zinky",
      "zippo",
      "zippy",
      "ziram",
      "zitis",
      "zizel",
      "zizit",
      "zlote",
      "zloty",
      "zoaea",
      "zobos",
      "zobus",
      "zocco",
      "zoeae",
      "zoeal",
      "zoeas",
      "zoism",
      "zoist",
      "zombi",
      "zonae",
      "zonda",
      "zoned",
      "zoner",
      "zones",
      "zonks",
      "zooea",
      "zooey",
      "zooid",
      "zooks",
      "zooms",
      "zoons",
      "zooty",
      "zoppa",
      "zoppo",
      "zoril",
      "zoris",
      "zorro",
      "zouks",
      "zowee",
      "zowie",
      "zulus",
      "zupan",
      "zupas",
      "zuppa",
      "zurfs",
      "zuzim",
      "zygal",
      "zygon",
      "zymes",
      "zymic"
    ]);
    Game = /* @__PURE__ */ __name(class {
      index;
      guesses;
      answers;
      answer;
      /**
       * Create a game object from the player's cookie, or initialise a new game
       */
      constructor(serialized = void 0) {
        if (serialized) {
          const [index8, guesses, answers] = serialized.split("-");
          this.index = +index8;
          this.guesses = guesses ? guesses.split(" ") : [];
          this.answers = answers ? answers.split(" ") : [];
        } else {
          this.index = Math.floor(Math.random() * words.length);
          this.guesses = ["", "", "", "", "", ""];
          this.answers = [];
        }
        this.answer = words[this.index];
      }
      /**
       * Update game state based on a guess of a five-letter word. Returns
       * true if the guess was valid, false otherwise
       */
      enter(letters) {
        const word = letters.join("");
        const valid = allowed.has(word);
        if (!valid)
          return false;
        this.guesses[this.answers.length] = word;
        const available = Array.from(this.answer);
        const answer = Array(5).fill("_");
        for (let i = 0; i < 5; i += 1) {
          if (letters[i] === available[i]) {
            answer[i] = "x";
            available[i] = " ";
          }
        }
        for (let i = 0; i < 5; i += 1) {
          if (answer[i] === "_") {
            const index8 = available.indexOf(letters[i]);
            if (index8 !== -1) {
              answer[i] = "c";
              available[index8] = " ";
            }
          }
        }
        this.answers.push(answer.join(""));
        return true;
      }
      /**
       * Serialize game state so it can be set as a cookie
       */
      toString() {
        return `${this.index}-${this.guesses.join(" ")}-${this.answers.join(" ")}`;
      }
    }, "Game");
    load2 = /* @__PURE__ */ __name(({ cookies }) => {
      const game = new Game(cookies.get("sverdle"));
      return {
        /**
         * The player's guessed words so far
         */
        guesses: game.guesses,
        /**
         * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
         * an exact match, and 'c' means a close match (right letter, wrong place)
         */
        answers: game.answers,
        /**
         * The correct answer, revealed if the game is over
         */
        answer: game.answers.length >= 6 ? game.answer : null
      };
    }, "load2");
    actions2 = {
      /**
       * Modify game state in reaction to a keypress. If client-side JavaScript
       * is available, this will happen in the browser instead of here
       */
      update: async ({ request, cookies }) => {
        const game = new Game(cookies.get("sverdle"));
        const data = await request.formData();
        const key2 = data.get("key");
        const i = game.answers.length;
        if (key2 === "backspace") {
          game.guesses[i] = game.guesses[i].slice(0, -1);
        } else {
          game.guesses[i] += key2;
        }
        cookies.set("sverdle", game.toString(), { path: "/" });
      },
      /**
       * Modify game state in reaction to a guessed word. This logic always runs on
       * the server, so that people can't cheat by peeking at the JavaScript
       */
      enter: async ({ request, cookies }) => {
        const game = new Game(cookies.get("sverdle"));
        const data = await request.formData();
        const guess = data.getAll("guess");
        if (!game.enter(guess)) {
          return fail(400, { badGuess: true });
        }
        cookies.set("sverdle", game.toString(), { path: "/" });
      },
      restart: async ({ cookies }) => {
        cookies.delete("sverdle", { path: "/" });
      }
    };
  }
});
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => _page4
});
function _page4($$payload, $$props) {
  push();
  let { data, form = void 0 } = $$props;
  let won = data.answers.at(-1) === "xxxxx";
  let i = won ? -1 : data.answers.length;
  let currentGuess = data.guesses[i] || "";
  let submittable = currentGuess.length === 5;
  const { classnames, description } = (() => {
    let classnames2 = {};
    let description2 = {};
    data.answers.forEach((answer, i2) => {
      const guess = data.guesses[i2];
      for (let i3 = 0; i3 < 5; i3 += 1) {
        const letter = guess[i3];
        if (answer[i3] === "x") {
          classnames2[letter] = "exact";
          description2[letter] = "correct";
        } else if (!classnames2[letter]) {
          classnames2[letter] = answer[i3] === "c" ? "close" : "missing";
          description2[letter] = answer[i3] === "c" ? "present" : "absent";
        }
      }
    });
    return { classnames: classnames2, description: description2 };
  })();
  const each_array = ensure_array_like(Array.from(Array(6).keys()));
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Sverdle</title>`;
    $$payload2.out += `<meta name="description" content="A Wordle clone written in SvelteKit" class="svelte-1pg2j5l">`;
  });
  $$payload.out += `<h1 class="visually-hidden svelte-1pg2j5l">Sverdle</h1> <form method="post" action="?/enter" class="svelte-1pg2j5l"><a class="how-to-play svelte-1pg2j5l" href="/sverdle/how-to-play">How to play</a> <div${attr("class", `grid svelte-1pg2j5l ${stringify([
    !won ? "playing" : "",
    form?.badGuess ? "bad-guess" : ""
  ].filter(Boolean).join(" "))}`)}><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let row = each_array[$$index_1];
    const current = row === i;
    const each_array_1 = ensure_array_like(Array.from(Array(5).keys()));
    $$payload.out += `<h2 class="visually-hidden svelte-1pg2j5l">Row ${escape_html(row + 1)}</h2> <div${attr("class", `row svelte-1pg2j5l ${stringify([current ? "current" : ""].filter(Boolean).join(" "))}`)}><!--[-->`;
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let column = each_array_1[$$index];
      const guess = current ? currentGuess : data.guesses[row];
      const answer = data.answers[row]?.[column];
      const value = guess?.[column] ?? "";
      const selected = current && column === guess.length;
      const exact = answer === "x";
      const close = answer === "c";
      const missing = answer === "_";
      $$payload.out += `<div${attr("class", `letter svelte-1pg2j5l ${stringify([
        exact ? "exact" : "",
        close ? "close" : "",
        missing ? "missing" : "",
        selected ? "selected" : ""
      ].filter(Boolean).join(" "))}`)}>${escape_html(value)} <span class="visually-hidden svelte-1pg2j5l">`;
      if (exact) {
        $$payload.out += "<!--[-->";
        $$payload.out += `(correct)`;
      } else {
        $$payload.out += "<!--[!-->";
        if (close) {
          $$payload.out += "<!--[-->";
          $$payload.out += `(present)`;
        } else {
          $$payload.out += "<!--[!-->";
          if (missing) {
            $$payload.out += "<!--[-->";
            $$payload.out += `(absent)`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `empty`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></span> <input name="guess"${attr("disabled", !current, true)} type="hidden"${attr("value", value)} class="svelte-1pg2j5l"></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="controls svelte-1pg2j5l">`;
  if (won || data.answers.length >= 6) {
    $$payload.out += "<!--[-->";
    if (!won && data.answer) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<p class="svelte-1pg2j5l">the answer was "${escape_html(data.answer)}"</p>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button data-key="enter" class="restart selected svelte-1pg2j5l" formaction="?/restart">${escape_html(won ? "you won :)" : `game over :(`)} play again?</button>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_2 = ensure_array_like(["qwertyuiop", "asdfghjkl", "zxcvbnm"]);
    $$payload.out += `<div class="keyboard svelte-1pg2j5l"><button data-key="enter"${attr("disabled", !submittable, true)}${attr("class", `svelte-1pg2j5l ${stringify([submittable ? "selected" : ""].filter(Boolean).join(" "))}`)}>enter</button> <button data-key="backspace" formaction="?/update" name="key" value="backspace" class="svelte-1pg2j5l">back</button> <!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let row = each_array_2[$$index_3];
      const each_array_3 = ensure_array_like(row);
      $$payload.out += `<div class="row svelte-1pg2j5l"><!--[-->`;
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let letter = each_array_3[$$index_2];
        $$payload.out += `<button${attr("data-key", letter)}${attr("class", `${stringify(classnames[letter])} svelte-1pg2j5l`)}${attr("disabled", submittable, true)} formaction="?/update" name="key"${attr("value", letter)}${attr("aria-label", `${stringify(letter)} ${stringify(description[letter] || "")}`)}>${escape_html(letter)}</button>`;
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></form> `;
  if (won) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div style="position: absolute; left: 50%; top: 30%" class="svelte-1pg2j5l"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { form });
  pop();
}
__name(_page4, "_page4");
var getInitialMotionPreference;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/sverdle/_page.svelte.js"() {
    init_index3();
    init_client();
    init_index2();
    getInitialMotionPreference = /* @__PURE__ */ __name(() => {
      return false;
    }, "getInitialMotionPreference");
    readable(getInitialMotionPreference(), (set2) => {
    });
  }
});
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  server: () => page_server_ts_exports2,
  server_id: () => server_id2,
  stylesheets: () => stylesheets6
});
var index6;
var component_cache6;
var component6;
var server_id2;
var imports6;
var stylesheets6;
var fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_page_server_ts2();
    index6 = 5;
    component6 = /* @__PURE__ */ __name(async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default, "component6");
    server_id2 = "src/routes/sverdle/+page.server.ts";
    imports6 = ["_app/immutable/nodes/5.BeEPqJ7b.js", "_app/immutable/chunks/disclose-version._bx3ty70.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/render.D7WQuqm4.js", "_app/immutable/chunks/svelte-head.CnFvDmQ8.js", "_app/immutable/chunks/props.mF8KbROt.js", "_app/immutable/chunks/store.CC9CMBvc.js", "_app/immutable/chunks/forms.BYV2KZDa.js", "_app/immutable/chunks/entry.k1rp80hB.js", "_app/immutable/chunks/index.CkknOhtp.js", "_app/immutable/chunks/attributes.CwDe2KbA.js"];
    stylesheets6 = ["_app/immutable/assets/5.yeGN9jlM.css"];
    fonts6 = [];
  }
});
var page_ts_exports2 = {};
__export(page_ts_exports2, {
  csr: () => csr2,
  prerender: () => prerender2
});
var csr2;
var prerender2;
var init_page_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/sverdle/how-to-play/_page.ts.js"() {
    init_index4();
    csr2 = dev;
    prerender2 = false;
  }
});
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => _page5
});
function _page5($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>How to play Sverdle</title>`;
    $$payload2.out += `<meta name="description" content="How to play Sverdle">`;
  });
  $$payload.out += `<div class="text-column"><h1>How to play Sverdle</h1> <p>Sverdle is a clone of <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>, the
		word guessing game. To play, enter a five-letter English word. For example:</p> <div class="example svelte-1x5nq1n"><span class="close svelte-1x5nq1n">r</span> <span class="missing svelte-1x5nq1n">i</span> <span class="close svelte-1x5nq1n">t</span> <span class="missing svelte-1x5nq1n">z</span> <span class="exact svelte-1x5nq1n">y</span></div> <p class="svelte-1x5nq1n">The <span class="exact svelte-1x5nq1n">y</span> is in the right place. <span class="close svelte-1x5nq1n">r</span> and <span class="close svelte-1x5nq1n">t</span> are the right letters, but in the wrong place. The other letters are wrong, and can be discarded.
		Let's make another guess:</p> <div class="example svelte-1x5nq1n"><span class="exact svelte-1x5nq1n">p</span> <span class="exact svelte-1x5nq1n">a</span> <span class="exact svelte-1x5nq1n">r</span> <span class="exact svelte-1x5nq1n">t</span> <span class="exact svelte-1x5nq1n">y</span></div> <p>This time we guessed right! You have <strong>six</strong> guesses to get the word.</p> <p>Unlike the original Wordle, Sverdle runs on the server instead of in the browser, making it
		impossible to cheat. It uses <code>&lt;form></code> and cookies to submit data, meaning you can
		even play with JavaScript disabled!</p></div>`;
}
__name(_page5, "_page5");
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/sverdle/how-to-play/_page.svelte.js"() {
    init_index3();
  }
});
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7,
  universal: () => page_ts_exports2,
  universal_id: () => universal_id3
});
var index7;
var component_cache7;
var component7;
var universal_id3;
var imports7;
var stylesheets7;
var fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_page_ts2();
    index7 = 6;
    component7 = /* @__PURE__ */ __name(async () => component_cache7 ??= (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default, "component7");
    universal_id3 = "src/routes/sverdle/how-to-play/+page.ts";
    imports7 = ["_app/immutable/nodes/6.OICHQEyM.js", "_app/immutable/chunks/index.DmefBFGc.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/disclose-version._bx3ty70.js", "_app/immutable/chunks/svelte-head.CnFvDmQ8.js"];
    stylesheets7 = ["_app/immutable/assets/6.Dv9QCmvw.css"];
    fonts7 = [];
  }
});
init_node();
init_index3();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
__name(override, "override");
function reset() {
  base = initial.base;
  assets = initial.assets;
}
__name(reset, "reset");
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
__name(set_private_env, "set_private_env");
function set_public_env(environment) {
  public_env = environment;
}
__name(set_public_env, "set_public_env");
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
__name(set_safe_public_env, "set_safe_public_env");
function hydration_mismatch(location) {
  {
    console.warn("hydration_mismatch");
  }
}
__name(hydration_mismatch, "hydration_mismatch");
var hydrating = false;
function set_hydrating(value) {
  hydrating = value;
}
__name(set_hydrating, "set_hydrating");
var hydrate_node;
function set_hydrate_node(node) {
  if (node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = node;
}
__name(set_hydrate_node, "set_hydrate_node");
function hydrate_next() {
  return set_hydrate_node(
    /** @type {TemplateNode} */
    get_next_sibling(hydrate_node)
  );
}
__name(hydrate_next, "hydrate_next");
var all_registered_events = /* @__PURE__ */ new Set();
var root_event_handles = /* @__PURE__ */ new Set();
function handle_event_propagation(event) {
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event.type;
  var path = event.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  var path_idx = 0;
  var handled_at = event.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event.__root = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  if (current_target === handler_element)
    return;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
      current_target.host || null;
      try {
        var delegated = current_target["__" + event_name];
        if (delegated !== void 0 && !/** @type {any} */
        current_target.disabled) {
          if (is_array(delegated)) {
            var [fn, ...data] = delegated;
            fn.apply(current_target, [event, ...data]);
          } else {
            delegated.call(current_target, event);
          }
        }
      } catch (error) {
        if (throw_error) {
          other_errors.push(error);
        } else {
          throw_error = error;
        }
      }
      if (event.cancelBubble || parent_element === handler_element || parent_element === null) {
        break;
      }
      current_target = parent_element;
    }
    if (throw_error) {
      for (let error of other_errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
      throw throw_error;
    }
  } finally {
    event.__root = handler_element;
    delete event.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
__name(handle_event_propagation, "handle_event_propagation");
function assign_nodes(start, end) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes_start === null) {
    effect2.nodes_start = start;
    effect2.nodes_end = end;
  }
}
__name(assign_nodes, "assign_nodes");
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
__name(is_passive_event, "is_passive_event");
function mount(component8, options2) {
  return _mount(component8, options2);
}
__name(mount, "mount");
function hydrate(component8, options2) {
  init_operations();
  options2.intro = options2.intro ?? false;
  const target = options2.target;
  const was_hydrating = hydrating;
  const previous_hydrate_node = hydrate_node;
  try {
    var anchor = (
      /** @type {TemplateNode} */
      get_first_child(target)
    );
    while (anchor && (anchor.nodeType !== 8 || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = /** @type {TemplateNode} */
      get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    hydrate_next();
    const instance = _mount(component8, { ...options2, anchor });
    if (hydrate_node === null || hydrate_node.nodeType !== 8 || /** @type {Comment} */
    hydrate_node.data !== HYDRATION_END) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error) {
    if (error === HYDRATION_ERROR) {
      if (options2.recover === false) {
        hydration_failed();
      }
      init_operations();
      clear_text_content(target);
      set_hydrating(false);
      return mount(component8, options2);
    }
    throw error;
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
  }
}
__name(hydrate, "hydrate");
var document_listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
  init_operations();
  var registered_events = /* @__PURE__ */ new Set();
  var event_handle = /* @__PURE__ */ __name((events2) => {
    for (var i = 0; i < events2.length; i++) {
      var event_name = events2[i];
      if (registered_events.has(event_name))
        continue;
      registered_events.add(event_name);
      var passive = is_passive_event(event_name);
      target.addEventListener(event_name, handle_event_propagation, { passive });
      var n2 = document_listeners.get(event_name);
      if (n2 === void 0) {
        document.addEventListener(event_name, handle_event_propagation, { passive });
        document_listeners.set(event_name, 1);
      } else {
        document_listeners.set(event_name, n2 + 1);
      }
    }
  }, "event_handle");
  event_handle(array_from(all_registered_events));
  root_event_handles.add(event_handle);
  var component8 = void 0;
  var unmount2 = effect_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    branch(() => {
      if (context) {
        push$1({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        ctx.c = context;
      }
      if (events) {
        props.$$events = events;
      }
      if (hydrating) {
        assign_nodes(
          /** @type {TemplateNode} */
          anchor_node,
          null
        );
      }
      component8 = Component(anchor_node, props) || {};
      if (hydrating) {
        active_effect.nodes_end = hydrate_node;
      }
      if (context) {
        pop$1();
      }
    });
    return () => {
      for (var event_name of registered_events) {
        target.removeEventListener(event_name, handle_event_propagation);
        var n2 = (
          /** @type {number} */
          document_listeners.get(event_name)
        );
        if (--n2 === 0) {
          document.removeEventListener(event_name, handle_event_propagation);
          document_listeners.delete(event_name);
        } else {
          document_listeners.set(event_name, n2);
        }
      }
      root_event_handles.delete(event_handle);
      mounted_components.delete(component8);
      if (anchor_node !== anchor) {
        anchor_node.parentNode?.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component8, unmount2);
  return component8;
}
__name(_mount, "_mount");
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component8) {
  const fn = mounted_components.get(component8);
  if (fn) {
    fn();
  }
}
__name(unmount, "unmount");
function asClassComponent$1(component8) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options2) {
      super({
        component: component8,
        ...options2
      });
    }
  };
}
__name(asClassComponent$1, "asClassComponent$1");
var Svelte4Component = /* @__PURE__ */ __name(class {
  /** @type {any} */
  #events;
  /** @type {Record<string, any>} */
  #instance;
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options2) {
    var sources = /* @__PURE__ */ new Map();
    var add_source = /* @__PURE__ */ __name((key2, value) => {
      var s3 = mutable_source(value);
      sources.set(key2, s3);
      return s3;
    }, "add_source");
    const props = new Proxy(
      { ...options2.props || {}, $$events: {} },
      {
        get(target, prop) {
          return get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
        },
        has(target, prop) {
          get(sources.get(prop) ?? add_source(prop, Reflect.get(target, prop)));
          return Reflect.has(target, prop);
        },
        set(target, prop, value) {
          set(sources.get(prop) ?? add_source(prop, value), value);
          return Reflect.set(target, prop, value);
        }
      }
    );
    this.#instance = (options2.hydrate ? hydrate : mount)(options2.component, {
      target: options2.target,
      props,
      context: options2.context,
      intro: options2.intro ?? false,
      recover: options2.recover
    });
    if (!options2?.props?.$$host || options2.sync === false) {
      flush_sync();
    }
    this.#events = props.$$events;
    for (const key2 of Object.keys(this.#instance)) {
      if (key2 === "$set" || key2 === "$destroy" || key2 === "$on")
        continue;
      define_property(this, key2, {
        get() {
          return this.#instance[key2];
        },
        /** @param {any} value */
        set(value) {
          this.#instance[key2] = value;
        },
        enumerable: true
      });
    }
    this.#instance.$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    this.#instance.$destroy = () => {
      unmount(this.#instance);
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    this.#instance.$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    this.#events[event] = this.#events[event] || [];
    const cb = /* @__PURE__ */ __name((...args) => callback.call(this, ...args), "cb");
    this.#events[event].push(cb);
    return () => {
      this.#events[event] = this.#events[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    this.#instance.$destroy();
  }
}, "Svelte4Component");
var read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
__name(set_read_implementation, "set_read_implementation");
function asClassComponent(component8) {
  const component_constructor = asClassComponent$1(component8);
  const _render = /* @__PURE__ */ __name((props, { context } = {}) => {
    const result = render(component8, { props, context });
    return {
      css: { code: "", map: null },
      head: result.head,
      html: result.body
    };
  }, "_render");
  component_constructor.render = _render;
  return component_constructor;
}
__name(asClassComponent, "asClassComponent");
var prerendering = false;
function Root($$payload, $$props) {
  push();
  let {
    stores,
    page: page2,
    constructors,
    components = [],
    form,
    data_0 = null,
    data_1 = null
  } = $$props;
  {
    setContext("__svelte__", stores);
  }
  {
    stores.page.set(page2);
  }
  const Pyramid_1 = constructors[1];
  if (constructors[1]) {
    $$payload.out += "<!--[-->";
    const Pyramid_0 = constructors[0];
    $$payload.out += `<!---->`;
    Pyramid_0($$payload, {
      data: data_0,
      form,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        Pyramid_1($$payload2, { data: data_1, form });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    const Pyramid_0 = constructors[0];
    $$payload.out += `<!---->`;
    Pyramid_0($$payload, { data: data_0, form });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
__name(Root, "Root");
var root = asClassComponent(Root);
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  templates: {
    app: ({ head: head2, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head2 + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body2 + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1unqz6k"
};
async function get_hooks() {
  return {
    ...await Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports))
  };
}
__name(get_hooks, "get_hooks");
init_chunks();
init_exports();
var escaped = {
  "<": "\\u003C",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = /* @__PURE__ */ __name(class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
}, "DevalueError");
function is_primitive(thing) {
  return Object(thing) !== thing;
}
__name(is_primitive, "is_primitive");
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
  Object.prototype
).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
__name(is_plain_object, "is_plain_object");
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
__name(get_type, "get_type");
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
__name(get_escaped_char, "get_escaped_char");
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
__name(stringify_string, "stringify_string");
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
__name(enumerable_symbols, "enumerable_symbols");
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function stringify_key(key2) {
  return is_identifier.test(key2) ? "." + key2 : "[" + JSON.stringify(key2) + "]";
}
__name(stringify_key, "stringify_key");
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom2 = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom2.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array":
          return;
        case "ArrayBuffer":
          return;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(stringify_key(key2));
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  __name(walk, "walk");
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify3(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom2.has(thing)) {
      return custom2.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify3(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify3(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify3).join(",")}])`;
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array": {
        const typedArray = thing;
        return `new ${type}([${typedArray.toString()}])`;
      }
      case "ArrayBuffer": {
        const ui8 = new Uint8Array(thing);
        return `new Uint8Array([${ui8.toString()}]).buffer`;
      }
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify3(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  __name(stringify3, "stringify3");
  const str = stringify3(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom2.has(thing)) {
        values.push(
          /** @type {string} */
          custom2.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify3(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify3(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify3(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify3(k)}, ${stringify3(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify3(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
__name(uneval, "uneval");
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
__name(get_name, "get_name");
function escape_unsafe_char(c2) {
  return escaped[c2] || c2;
}
__name(escape_unsafe_char, "escape_unsafe_char");
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
__name(escape_unsafe_chars, "escape_unsafe_chars");
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
__name(safe_key, "safe_key");
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
__name(safe_prop, "safe_prop");
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
__name(stringify_primitive, "stringify_primitive");
function encode64(arraybuffer) {
  const dv = new DataView(arraybuffer);
  let binaryString = "";
  for (let i = 0; i < arraybuffer.byteLength; i++) {
    binaryString += String.fromCharCode(dv.getUint8(i));
  }
  return binaryToAscii(binaryString);
}
__name(encode64, "encode64");
var KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function binaryToAscii(str) {
  let out = "";
  for (let i = 0; i < str.length; i += 3) {
    const groupsOfSix = [void 0, void 0, void 0, void 0];
    groupsOfSix[0] = str.charCodeAt(i) >> 2;
    groupsOfSix[1] = (str.charCodeAt(i) & 3) << 4;
    if (str.length > i + 1) {
      groupsOfSix[1] |= str.charCodeAt(i + 1) >> 4;
      groupsOfSix[2] = (str.charCodeAt(i + 1) & 15) << 2;
    }
    if (str.length > i + 2) {
      groupsOfSix[2] |= str.charCodeAt(i + 2) >> 6;
      groupsOfSix[3] = str.charCodeAt(i + 2) & 63;
    }
    for (let j = 0; j < groupsOfSix.length; j++) {
      if (typeof groupsOfSix[j] === "undefined") {
        out += "=";
      } else {
        out += KEY_STRING[groupsOfSix[j]];
      }
    }
  }
  return out;
}
__name(binaryToAscii, "binaryToAscii");
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;
function stringify2(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom2 = [];
  if (reducers) {
    for (const key2 of Object.getOwnPropertyNames(reducers)) {
      custom2.push({ key: key2, fn: reducers[key2] });
    }
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index9 = p++;
    indexes.set(thing, index9);
    for (const { key: key2, fn } of custom2) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index9] = `["${key2}",${flatten(value2)}]`;
        return index9;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source: source2, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source2)},"${flags}"]` : `["RegExp",${stringify_string(source2)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
        case "BigInt64Array":
        case "BigUint64Array": {
          const typedArray = thing;
          const base642 = encode64(typedArray.buffer);
          str = '["' + type + '","' + base642 + '"]';
          break;
        }
        case "ArrayBuffer": {
          const arraybuffer = thing;
          const base642 = encode64(arraybuffer);
          str = `["ArrayBuffer","${base642}"]`;
          break;
        }
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(stringify_key(key2));
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(stringify_key(key2));
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index9] = str;
    return index9;
  }
  __name(flatten, "flatten");
  const index8 = flatten(value);
  if (index8 < 0)
    return `${index8}`;
  return `[${stringified.join(",")}]`;
}
__name(stringify2, "stringify2");
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
__name(stringify_primitive2, "stringify_primitive2");
init_index2();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/ \t]+)\/([^; \t]+)[ \t]*(?:;[ \t]*q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
__name(negotiate, "negotiate");
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
__name(is_content_type, "is_content_type");
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
__name(is_form_content_type, "is_form_content_type");
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
__name(coalesce_to_error, "coalesce_to_error");
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
__name(normalize_error, "normalize_error");
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
__name(get_status, "get_status");
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
__name(get_message, "get_message");
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
__name(method_not_allowed, "method_not_allowed");
function allowed_methods(mod) {
  const allowed2 = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed2.push("HEAD");
  return allowed2;
}
__name(allowed_methods, "allowed_methods");
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
__name(static_error_page, "static_error_page");
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
__name(handle_fatal_error, "handle_fatal_error");
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
__name(handle_error_and_jsonify, "handle_error_and_jsonify");
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
__name(redirect_response, "redirect_response");
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
__name(clarify_devalue_error, "clarify_devalue_error");
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
__name(stringify_uses, "stringify_uses");
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender3 = mod.prerender ?? state.prerender_default;
  if (prerender3 && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender3) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender3));
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return new Response(void 0, {
        status: e3.status,
        headers: { location: e3.location }
      });
    }
    throw e3;
  }
}
__name(render_endpoint, "render_endpoint");
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
__name(is_endpoint_request, "is_endpoint_request");
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
__name(compact, "compact");
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
__name(is_action_json_request, "is_action_json_request");
async function handle_action_json_request(event, options2, server2) {
  const actions3 = server2?.actions;
  if (!actions3) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions3);
  try {
    const data = await call_action(event, actions3);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
__name(handle_action_json_request, "handle_action_json_request");
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
__name(check_incorrect_fail_use, "check_incorrect_fail_use");
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
__name(action_json_redirect, "action_json_redirect");
function action_json(data, init2) {
  return json(data, init2);
}
__name(action_json, "action_json");
function is_action_request(event) {
  return event.request.method === "POST";
}
__name(is_action_request, "is_action_request");
async function handle_action_request(event, server2) {
  const actions3 = server2?.actions;
  if (!actions3) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions3);
  try {
    const data = await call_action(event, actions3);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e3) {
    const err = normalize_error(e3);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
__name(handle_action_request, "handle_action_request");
function check_named_default_separate(actions3) {
  if (actions3.default && Object.keys(actions3).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://svelte.dev/docs/kit/form-actions#named-actions"
    );
  }
}
__name(check_named_default_separate, "check_named_default_separate");
async function call_action(event, actions3) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions3[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
__name(call_action, "call_action");
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
__name(uneval_action_response, "uneval_action_response");
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify2, route_id);
}
__name(stringify_action_response, "stringify_action_response");
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e3) {
    const error = (
      /** @type {any} */
      e3
    );
    if (data instanceof Response) {
      throw new Error(
        `Data returned from action inside ${route_id} is not serializable. Form actions need to return plain objects or fail(). E.g. return { success: true } or return fail(400, { message: "invalid" });`
      );
    }
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "")
        message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
__name(try_deserialize, "try_deserialize");
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
__name(b64_encode, "b64_encode");
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
__name(load_server_data, "load_server_data");
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr: csr3
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr3, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
__name(load_data, "load_data");
function create_universal_fetch(event, state, fetched, csr3, resolve_opts) {
  const universal_fetch = /* @__PURE__ */ __name(async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        __name(push_fetched, "push_fetched");
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        __name(text2, "text2");
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr3) {
      const get3 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get3.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://svelte.dev/docs/kit/hooks#Server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  }, "universal_fetch");
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
__name(create_universal_fetch, "create_universal_fetch");
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
__name(stream_to_string, "stream_to_string");
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
__name(hash, "hash");
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
__name(escape_html_attr, "escape_html_attr");
var replacements2 = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements2).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements2[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
__name(serialize_data, "serialize_data");
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
__name(sha256, "sha256");
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  __name(frac, "frac");
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
__name(precompute, "precompute");
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c2 = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c2;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
__name(reverse_endianness, "reverse_endianness");
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words2 = new Uint32Array(bytes.buffer);
  words2[words2.length - 2] = Math.floor(length / 4294967296);
  words2[words2.length - 1] = length;
  return words2;
}
__name(encode, "encode");
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
__name(base64, "base64");
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
__name(generate_nonce, "generate_nonce");
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = /* @__PURE__ */ __name(class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#script_src.push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#script_src.length === 0) {
          this.#script_src.push(`nonce-${this.#nonce}`);
        }
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#style_src.push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#style_src.length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          this.#style_src.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
}, "BaseProvider");
var CspProvider = /* @__PURE__ */ __name(class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
}, "CspProvider");
var CspReportOnlyProvider = /* @__PURE__ */ __name(class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
}, "CspReportOnlyProvider");
var Csp = /* @__PURE__ */ __name(class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender: prerender3 }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender3;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
}, "Csp");
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r3) => {
    fulfil = f;
    reject = r3;
  });
  return { promise, fulfil, reject };
}
__name(defer, "defer");
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
__name(create_async_iterator, "create_async_iterator");
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch: branch2,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets8 = new Set(client.stylesheets);
  const fonts8 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch2.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch2.length; i += 1) {
      data2 = { ...data2, ...branch2[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch2) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets8.add(url);
      for (const url of node.fonts)
        fonts8.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head2 = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = /* @__PURE__ */ __name((path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  }, "prefixed");
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head2 += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets8) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head2 += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts8) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head2 += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch2.map((b) => b.server_data),
    csp,
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head2 += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head2 += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate2 = [
        `node_ids: [${branch2.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate2.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate2.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate2.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head2 = http_equiv.join("\n") + head2;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head2 += rendered.head;
  const html = options2.templates.app({
    head: head2,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: headers2
    }
  );
}
__name(render_response, "render_response");
function get_data(event, options2, nodes, csp, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push: push2, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          const nonce = csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : "";
          push2(`<script${nonce}>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  __name(replacer, "replacer");
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
__name(get_data, "get_data");
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
__name(get_option, "get_option");
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch2 = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr3 = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        // eslint-disable-next-line @typescript-eslint/require-await
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr: csr3
      });
      branch2.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: csr3
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch: branch2,
      fetched,
      event,
      resolve_opts
    });
  } catch (e3) {
    if (e3 instanceof Redirect) {
      return redirect_response(e3.status, e3.location);
    }
    return static_error_page(
      options2,
      get_status(e3),
      (await handle_error_and_jsonify(event, options2, e3)).message
    );
  }
}
__name(respond_with_error, "respond_with_error");
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
__name(once, "once");
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n2, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n2 == void 0 ? n2 : await manifest2._.nodes[n2]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e3) {
          aborted = true;
          throw e3;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e3) {
    const error = normalize_error(e3);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
__name(render_data, "render_data");
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
__name(json_response, "json_response");
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
__name(redirect_json_response, "redirect_json_response");
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push: push2, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e3) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e3
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify2(value, reducers);
            } catch {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify2(error, reducers);
            }
            count -= 1;
            push2(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify2(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e3) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e3
    ));
  }
}
__name(get_data_json, "get_data_json");
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n2) => n2 == void 0 ? n2 : manifest2._.nodes[n2]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
__name(load_page_nodes, "load_page_nodes");
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      if (DEV && action_result && !event.request.headers.has("x-sveltekit-action"))
        ;
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch2 = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, parent.data);
              }
              return data;
            }
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    const csr3 = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr: csr3
          });
        } catch (e3) {
          load_error = /** @type {Error} */
          e3;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch2.push({ node, server_data, data });
        } catch (e3) {
          const err = normalize_error(e3);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index8 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index8]();
              let j = i;
              while (!branch2[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch2.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch2.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch2.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch2),
      action_result,
      fetched
    });
  } catch (e3) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e3,
      resolve_opts
    });
  }
}
__name(render_page, "render_page");
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s22) => s22).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
__name(exec, "exec");
var INVALID_COOKIE_CHARACTER_REGEX = /[\x00-\x1F\x7F()<>@,;:"/[\]?={} \t]/;
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
__name(validate_options, "validate_options");
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c2 = new_cookies[name];
      if (c2 && domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
        return c2.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c2 of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c2.options.domain) && path_matches(url.pathname, c2.options.path)) {
          cookies2[c2.name] = c2.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      const illegal_characters = name.match(INVALID_COOKIE_CHARACTER_REGEX);
      if (illegal_characters) {
        console.warn(
          `The cookie name "${name}" will be invalid in SvelteKit 3.0 as it contains ${illegal_characters.join(" and ")}. See RFC 2616 for more details https://datatracker.ietf.org/doc/html/rfc2616#section-2.2`
        );
      }
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  __name(get_cookie_header, "get_cookie_header");
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  __name(set_internal, "set_internal");
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
__name(get_cookies, "get_cookies");
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
__name(domain_matches, "domain_matches");
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
__name(path_matches, "path_matches");
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, { ...options2, path }));
    }
  }
}
__name(add_cookies_to_headers, "add_cookies_to_headers");
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = /* @__PURE__ */ __name(async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename) || filename in manifest2._.server_assets;
        const is_asset_html = manifest2.assets.has(filename_html) || filename_html in manifest2._.server_assets;
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else if (read_implementation && file in manifest2._.server_assets) {
            const length = manifest2._.server_assets[file];
            const type = manifest2.mimeTypes[file.slice(file.lastIndexOf("."))];
            return new Response(read_implementation(file), {
              headers: {
                "Content-Length": "" + length,
                "Content-Type": type
              }
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  }, "server_fetch");
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
__name(create_fetch, "create_fetch");
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
__name(normalize_fetch_input, "normalize_fetch_input");
var body;
var etag;
var headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
__name(get_public_env, "get_public_env");
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config)
      continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
__name(get_page_config, "get_page_config");
var default_transform = /* @__PURE__ */ __name(({ html }) => html, "default_transform");
var default_filter = /* @__PURE__ */ __name(() => false, "default_filter");
var default_preload = /* @__PURE__ */ __name(({ type }) => type === "js" || type === "css", "default_preload");
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    const headers22 = new Headers();
    headers22.set("cache-control", "public, max-age=0, must-revalidate");
    return text("Not found", { status: 404, headers: headers22 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-cloudflare"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender3 = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender3 = node.prerender ?? prerender3;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender3 = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender3);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender: prerender3 });
        }
      }
    } else if (state.emulator?.platform) {
      event.platform = await state.emulator.platform({
        config: {},
        prerender: !!state.prerendering?.fallback
      });
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e3) {
    if (e3 instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e3) : route?.page && is_action_json_request(event) ? action_json_redirect(e3) : redirect_response(e3.status, e3.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e3);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e3) {
      return await handle_fatal_error(event2, options2, e3);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
  __name(resolve2, "resolve2");
}
__name(respond, "respond");
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
__name(filter_private_env, "filter_private_env");
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
__name(filter_public_env, "filter_public_env");
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var Server = /* @__PURE__ */ __name(class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (read) {
      set_read_implementation(read);
    }
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
}, "Server");
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  __name(__memo, "__memo");
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["favicon.png", "robots.txt"]),
    mimeTypes: { ".png": "image/png", ".txt": "text/plain" },
    _: {
      client: { "start": "_app/immutable/entry/start.5GbMUPaX.js", "app": "_app/immutable/entry/app.D6zD_SU0.js", "imports": ["_app/immutable/entry/start.5GbMUPaX.js", "_app/immutable/chunks/entry.k1rp80hB.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/index.CkknOhtp.js", "_app/immutable/entry/app.D6zD_SU0.js", "_app/immutable/chunks/runtime.Fkq6RHd0.js", "_app/immutable/chunks/render.D7WQuqm4.js", "_app/immutable/chunks/svelte-head.CnFvDmQ8.js", "_app/immutable/chunks/disclose-version._bx3ty70.js", "_app/immutable/chunks/props.mF8KbROt.js", "_app/immutable/chunks/store.CC9CMBvc.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/about",
          pattern: /^\/about\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/contact",
          pattern: /^\/contact\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/sverdle",
          pattern: /^\/sverdle\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/sverdle/how-to-play",
          pattern: /^\/sverdle\/how-to-play\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set([]);
var base_path = "";
async function e(e3, t2) {
  let n2 = "string" != typeof t2 && "HEAD" === t2.method;
  n2 && (t2 = new Request(t2, { method: "GET" }));
  let r3 = await e3.match(t2);
  return n2 && r3 && (r3 = new Response(null, r3)), r3;
}
__name(e, "e");
function t(e3, t2, n2, o2) {
  return ("string" == typeof t2 || "GET" === t2.method) && r(n2) && (n2.headers.has("Set-Cookie") && (n2 = new Response(n2.body, n2)).headers.append("Cache-Control", "private=Set-Cookie"), o2.waitUntil(e3.put(t2, n2.clone()))), n2;
}
__name(t, "t");
var n = /* @__PURE__ */ new Set([200, 203, 204, 300, 301, 404, 405, 410, 414, 501]);
function r(e3) {
  if (!n.has(e3.status))
    return false;
  if (~(e3.headers.get("Vary") || "").indexOf("*"))
    return false;
  let t2 = e3.headers.get("Cache-Control") || "";
  return !/(private|no-cache|no-store)/i.test(t2);
}
__name(r, "r");
function o(n2) {
  return async function(r3, o2) {
    let a = await e(n2, r3);
    if (a)
      return a;
    o2.defer((e3) => {
      t(n2, r3, e3, o2);
    });
  };
}
__name(o, "o");
var s2 = caches.default;
var c = t.bind(0, s2);
var r2 = e.bind(0, s2);
var e2 = o.bind(0, s2);
var server = new Server(manifest);
var app_path = `/${manifest.appPath}`;
var immutable = `${app_path}/immutable/`;
var version_file = `${app_path}/version.json`;
var worker = {
  async fetch(req, env, context) {
    await server.init({ env });
    let pragma = req.headers.get("cache-control") || "";
    let res = !pragma.includes("no-cache") && await r2(req);
    if (res)
      return res;
    let { pathname, search } = new URL(req.url);
    try {
      pathname = decodeURIComponent(pathname);
    } catch {
    }
    const stripped_pathname = pathname.replace(/\/$/, "");
    let is_static_asset = false;
    const filename = stripped_pathname.slice(base_path.length + 1);
    if (filename) {
      is_static_asset = manifest.assets.has(filename) || manifest.assets.has(filename + "/index.html") || filename in manifest._.server_assets || filename + "/index.html" in manifest._.server_assets;
    }
    let location = pathname.at(-1) === "/" ? stripped_pathname : pathname + "/";
    if (is_static_asset || prerendered.has(pathname) || pathname === version_file || pathname.startsWith(immutable)) {
      res = await env.ASSETS.fetch(req);
    } else if (location && prerendered.has(location)) {
      if (search)
        location += search;
      res = new Response("", {
        status: 308,
        headers: {
          location
        }
      });
    } else {
      res = await server.respond(req, {
        // @ts-ignore
        platform: { env, context, caches, cf: req.cf },
        getClientAddress() {
          return req.headers.get("cf-connecting-ip");
        }
      });
    }
    pragma = res.headers.get("cache-control") || "";
    return pragma && res.status < 400 ? c(req, res, context) : res;
  }
};
var worker_default = worker;

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e3) {
      console.error("Failed to drain the unused request body.", e3);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e3) {
  return {
    name: e3?.name,
    message: e3?.message ?? String(e3),
    stack: e3?.stack,
    cause: e3?.cause === void 0 ? void 0 : reduceError(e3.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e3) {
    const error = reduceError(e3);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../../.wrangler/tmp/bundle-BtH4ep/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head2, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head2(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../../.wrangler/tmp/bundle-BtH4ep/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker2) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker2;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker2.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker2.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker2,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker2.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker2.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=bundledWorker-0.7102892357912018.mjs.map
