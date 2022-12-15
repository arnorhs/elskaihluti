import { Component, JSX } from 'solid-js'

export const InlineAnchor: Component<{ href: string; children: JSX.Element }> = (props) => (
  <a class="underline text-blue-400" href={props.href}>
    {props.children}
  </a>
)
