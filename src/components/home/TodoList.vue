<template>
  <div class="todo-list-container">
    <div class="input-container">
      <input
        v-model="newTodoTitle"
        @keyup.enter="addTodo"
        placeholder="Add a new todo..."
      />
      <button @click="addTodo"><IconPlus /></button>
    </div>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :data="todo"
      @editTodo="editTodo"
      @deleteTodo="deleteTodo"
      @toggleCompleted="toggleCompleted"
    />
  </div>
</template>

<script setup>
import TodoItem from "@/components/home/TodoItem.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import { getTodoList } from "@/services/todo";
import { ref, onMounted } from "vue";

const todos = ref([]);
const newTodoTitle = ref("");

onMounted(async () => {
  try {
    const res = await getTodoList();
    if (res.status === 200) {
      todos.value = res.data;
    }
  } catch {
    return;
  }
});

const addTodo = () => {
  if (newTodoTitle.value.trim() === "") {
    return;
  }

  const newTodo = {
    title: newTodoTitle.value,
    completed: false,
  };

  todos.value.unshift(newTodo);
  newTodoTitle.value = "";
};

const editTodo = (editedTodo) => {
  const index = todos.value.findIndex((todo) => todo.id === editedTodo.id);
  if (index !== -1) {
    todos.value[index] = editedTodo;
  }
};

const deleteTodo = (todoId) => {
  const index = todos.value.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos.value.splice(index, 1);
  }
};

const toggleCompleted = (editedTodo) => {
  const index = todos.value.findIndex((todo) => todo.id === editedTodo.id);
  if (index !== -1) {
    todos.value[index].completed = editedTodo.completed;
  }
};
</script>

<style scoped>
.todo-list-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-y: scroll;
  max-height: 95vh;
}

.input-container input {
  padding: 8px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-container {
  display: flex;
}

button {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
}

button:hover {
  cursor: pointer;
}
</style>
