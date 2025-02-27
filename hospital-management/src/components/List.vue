<template>
  <div class="container">
    <div v-for="node in list" :key="node.id" class="node">
      <span v-if="node.isFolder" @click="toggleExpand(node)" class="expand-icon">
        {{ node.isExpanded ? ' - ' : ' + ' }}
      </span>
      <span>{{ node.name }}</span>
      <span class="menu" @click="toggleMenu(node.id, $event)"> : </span>
      <Teleport to="body">
        <div v-if="activeNodeId === node.id" class="modal" :style="modalPosition">
          <div v-if="node.isFolder" class="add-buttons">
            <div @click="handleAddNode(node.id, true)" class="button-update">
              <span class="add-item"> + </span>
              <span>Add Group</span>
            </div>
            <div @click="handleAddNode(node.id, false)" class="button-update">
              <span class="add-item"> + </span>
              <span>Add Clinicians</span>
            </div>
          </div>

          <div @click="handleDeleteNode(node.id)" class="button-update">
            <img src="../assets/delete.png" class="icon" alt="Delete" />
            <span>{{ node.isFolder ? 'Delete Group' : 'Remove Clinicians' }}</span>
          </div>
          <div @click="handleEditNode(node.id)" class="button-update">
            <img src="../assets/edit-icon.webp" class="icon" alt="Edit" />
            <span>{{ node.isFolder ? 'Edit Group' : 'Edit Clinicians' }}</span>
          </div>
        </div>
      </Teleport>
      <List
        v-if="node.isExpanded && node.children && node.children.length"
        :list="node.children"
        @add-node-to-list="$emit('addNodeToList', $event)"
        @delete-node-from-list="$emit('deleteNodeFromList', $event)"
        @edit-node-from-list="$emit('editNodeFromList', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import List from './List.vue'

defineProps<{ list: any[] }>()

const emit = defineEmits(['addNodeToList', 'deleteNodeFromList', 'editNodeFromList'])
const activeNodeId = ref<string | null>(null)
const modalPosition = ref({ top: '0px', left: '0px' })

const toggleExpand = (node: any) => {
  node.isExpanded = !node.isExpanded
}

const toggleMenu = (nodeId: string, event: MouseEvent) => {
  activeNodeId.value = activeNodeId.value === nodeId ? null : nodeId

  modalPosition.value = {
    top: `${event.clientY}px`,
    left: `${event.clientX}px`,
  }
}

const handleAddNode = (nodeId: string, isFolder: boolean) => {
  emit('addNodeToList', { parentId: nodeId, isFolder })
  activeNodeId.value = null
}

const handleDeleteNode = (nodeId: string) => {
  emit('deleteNodeFromList', nodeId)
  activeNodeId.value = null
}

const handleEditNode = (nodeId: string) => {
  emit('editNodeFromList', nodeId)
  activeNodeId.value = null
}
</script>

<style scoped>
.expand-icon {
  cursor: pointer;
}
.menu {
  cursor: pointer;
  padding: 10px;
}
.menu-icon {
  cursor: pointer;
  width: 20px;
  padding: 10px;
}
.icon {
  width: 20px;
}

.button-update {
  cursor: pointer;
}
.add-item {
  font-weight: bold;
  font-family: 14px;
  padding-left: 5px;
  align-items: flex-start;
}

.add-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.modal {
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal div {
  display: flex;
  gap: 8px;
}

.modal span {
  color: black;
}
</style>
