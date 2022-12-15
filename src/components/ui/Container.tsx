import * as Solid from 'solid-js'

export const Container: Solid.Component<{ children: Solid.JSX.Element }> = (props) => (
  <div class="container mx-auto">
    <div class="lg:w-1/2 mx-auto py-10">{props.children}</div>
  </div>
)
