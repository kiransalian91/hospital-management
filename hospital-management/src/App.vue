<template>
  <div class="app">
    <h1 class="title">Hospital Management System</h1>
    <List
      :list="nodes"
      @add-node-to-list="addNodeToList"
      @delete-node-from-list="deleteNodeFromList"
      @edit-node-from-list="editNodeFromList"
    />
  </div>
</template>
<script setup lang="ts">
import List from './components/List.vue'
import { storeToRefs } from 'pinia'
import { useNodeStore } from './stores/nodeStore'

const nodeStore = useNodeStore()
const { nodes } = storeToRefs(nodeStore)

const addNodeToList = ({ parentId, isFolder }: { parentId: string; isFolder: boolean }) => {
  const name = prompt('Enter node name:')
  if (name) nodeStore.addNode(parentId, name, isFolder)
}

const deleteNodeFromList = (nodeId: string) => {
  nodeStore.deleteNode(nodeId)
}

const editNodeFromList = (nodeId: string) => {
  const newName = prompt('Enter new name:')
  if (newName) nodeStore.editNode(nodeId, newName)
}
</script>
<style>
.title {
  text-align: center;
  padding: 20px;
}
</style>
