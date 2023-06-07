import { shallowMount } from '@vue/test-utils'
import Alerts from '@/components/Shared/Alerts/Alerts.vue'

describe('Alerts Component => Alerts for application', () => {
  test('should be render alerts errors', () => {
    const wrapper = shallowMount(Alerts, {
      propsData: {
        text: 'Test',
        type: 'error',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('should be render alerts info or success', () => {
    const wrapper = shallowMount(Alerts, {
      propsData: {
        text: 'Test',
        type: 'primary',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
