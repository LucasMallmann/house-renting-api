import { removeKeyFromObject as sut } from '@/utils/object'

describe('Remove key from Object', () => {
  test('should return null if object is empty', () => {
    expect(sut({}, 'test')).toBeFalsy()
  })

  test('should return object without key on success', () => {
    const item = {
      user: { _id: 'any_id', name: 'any_name' },
      _id: 'item_id',
      friends: {
        user: { _id: 'any_id', name: 'any_name' }
      }
    }
    expect(sut(item, '_id')).toEqual({
      user: { name: 'any_name' },
      friends: {
        user: { name: 'any_name' }
      }
    })
  })
})
