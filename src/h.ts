import { isStr, arrayfy } from './reconcile'
import { FreElement } from './type'

// for jsx2
// 自定义h函数
export const h = (type, props: any, ...kids) => {
  props = props || {}
  kids = flat(arrayfy(props.children || kids))

  if (kids.length) props.children = kids.length === 1 ? kids[0] : kids

  const key = props.key || null
  const ref = props.ref || null

  // 将props的key和ref重置为undefined
  if (key) props.key = undefined
  if (ref) props.ref = undefined

  return createVnode(type, props, key, ref)
}

const some = (x: unknown) => x != null && x !== true && x !== false

 // 将arr中的 null、true、false过滤，并将number、string装换为FreElement
const flat = (arr: any[], target = []) => {
  arr.forEach(v => {
    isArr(v)
      ? flat(v, target)
      : some(v) && target.push(isStr(v) ? createText(v) : v)
  })
  return target
}

export const createVnode = (type, props, key, ref) => ({
  type,
  props,
  key,
  ref,
})

export const createText = (vnode: any) =>
  ({ type: '', props: { nodeValue: vnode + '' } } as FreElement)

export function Fragment(props) {
  return props.children
}

export const isArr = Array.isArray
