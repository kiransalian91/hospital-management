import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import List from '../List.vue'

describe('List.vue', () => {
  const testList = [
    {
      id: '1',
      name: 'Node 1',
      isFolder: true,
      isExpanded: false,
      children: []
    }
  ]

  it('displays modal on menu click', async () => {
    const wrapper = mount(List, {
      props: { list: testList },
      global: {
        stubs: { Teleport: true, List: true }
      },
      attachTo: document.body
    })

    const menu = wrapper.find('.menu')
    await menu.trigger('click', { clientX: 100, clientY: 200 })

    const modal = wrapper.find('.modal')
    expect(modal.exists()).toBe(true)
  })

  it('emits addNodeToList on clicking "Add Group" button', async () => {
    const wrapper = mount(List, {
      props: { list: testList },
      global: {
        stubs: { Teleport: true, List: true }
      },
      attachTo: document.body
    })


    const menu = wrapper.find('.menu')
    await menu.trigger('click', { clientX: 100, clientY: 200 })


    const modal = wrapper.find('.modal')
    expect(modal.exists()).toBe(true)


    const addGroupButton = modal.findAll('.button-update').find(btn => btn.text().includes('Add Group'))
    expect(addGroupButton).toBeTruthy()

    await addGroupButton!.trigger('click')

    const emitted = wrapper.emitted()
    expect(emitted.addNodeToList).toBeTruthy()
    expect(emitted.addNodeToList[0]).toEqual([{ parentId: '1', isFolder: true }])
  })
})
