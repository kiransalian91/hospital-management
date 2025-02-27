import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '../../App.vue'

describe('App.vue', () => {
  it('renders the title "Hospital Management System"', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [
          createTestingPinia({ createSpy: vi.fn })
        ],
        stubs: {
          List: true
        }
      }
    })

    const title = wrapper.find('h1.title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Hospital Management System')
  })
})
