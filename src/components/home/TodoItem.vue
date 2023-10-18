<template>
  <div class="todo-item">
    <input
      type="checkbox"
      :checked="props.data.completed"
      @change="toggleCompleted"
      class="checkbox"
    />
    <span
      v-if="!isEditing"
      @dblclick="startEditing"
      class="todo-text"
      :class="props.data.completed && 'todo-text-crossed'"
    >
      {{ props.data.title }}
    </span>
    <input
      v-if="isEditing"
      v-model="editedTitle"
      @keyup.enter="saveEdit"
      ref="editInput"
      class="edit-input"
    />
    <button @click="startEditing" class="edit-button"><IconEdit /></button>
    <button @click="deleteTodo" class="delete-button"><IconDelete /></button>
  </div>
</template>

<script setup>
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import { ref } from "vue";
const props = defineProps({
  data: { type: Object, required: true, default: () => {} },
});
const emit = defineEmits(["editTodo", "deleteTodo", "toggleCompleted"]);

const isEditing = ref(false);
const editedTitle = ref(null);
const editInputRef = ref(null);

const startEditing = () => {
  editedTitle.value = props.data.title;
  isEditing.value = true;

  if (isEditing.value && editInputRef.value) {
    editInputRef.value.focus();
  }
};

const saveEdit = () => {
  if (editedTitle.value.trim() !== "") {
    isEditing.value = false;
    emit("editTodo", { ...props.data, title: editedTitle.value });
  } else {
    // Reset title if it's empty
    editedTitle.value = props.data.title;
  }
};

const deleteTodo = () => {
  emit("deleteTodo", props.data.id);
};

const toggleCompleted = () => {
  emit("toggleCompleted", { ...props.data, completed: !props.data.completed });
};
</script>

<style scoped>
.todo-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.todo-text {
  margin-right: 10px;
}

.edit-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.edit-button,
.delete-button {
  margin-right: 5px;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.checkbox {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #989797;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

.checkbox:checked {
  background-color: #ccc;
}

.todo-text-crossed {
  text-decoration: line-through;
}
</style>
