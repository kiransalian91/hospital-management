import { defineStore } from 'pinia'
import json from '../data.json'

export const useNodeStore = defineStore('nodeStore', {
  state: () => ({
    nodes: json,
  }),
  actions: {
    addNode(parentId: string, name: string, isFolder: boolean = true) {
      const addNodeRecursive = (list: any[]) => {
        list.forEach((node: any) => {
          if (node.id === parentId) {
            if (node.isFolder) {
              node.isExpanded = true
            }
            const newNode = {
              id: Date.now().toString(),
              name,
              isFolder,
              ...(isFolder ? { children: [] } : {}),
              isExpanded: false,
            }
            if (node.children) {
              node.children.push(newNode)
            } else {
              node.children = [newNode]
            }
          } else if (node.children) {
            addNodeRecursive(node.children)
          }
        })
      }
      addNodeRecursive(this.nodes)
    },

    deleteNode(nodeId: string) {
      const deleteNodeRecursive = (list: any[]) => {
        return list
          .filter((node: any) => node.id !== nodeId)
          .map((node: any) => {
            if (node.children) {
              node.children = deleteNodeRecursive(node.children)
            }
            return node
          })
      }
      this.nodes = deleteNodeRecursive(this.nodes)
    },

    editNode(nodeId: string, newName: string) {
      const editNodeRecursive = (list: any[]) => {
        list.forEach((node: any) => {
          if (node.id === nodeId) {
            node.name = newName
          } else if (node.children) {
            editNodeRecursive(node.children)
          }
        })
      }
      editNodeRecursive(this.nodes)
    },
  },
})
