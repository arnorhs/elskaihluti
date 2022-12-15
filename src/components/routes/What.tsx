import { Component } from 'solid-js'
import { Container } from '../ui/Container'
import { InlineAnchor } from '../ui/InlineAnchor'
import { A } from '@solidjs/router'

export const What: Component = () => (
  <Container>
    <A href="/">← Til baka</A>
    <h1 class="text-3xl font-bold my-5">Hvað er þetta?</h1>
    <p class="my-5">
      <InlineAnchor href="https://www.ihlutir.is/">Íhlutir</InlineAnchor> er æðisleg verslun sem
      selur mjög mikið magn af sérvöru tengdum rafeindavirkjun og vélbúnaði.
    </p>
    <p class="my-5">
      Það er hinsvegar hvimleitt að opna risastórt xls skjal þegar maður þarf að fletta einhverju
      upp í því eða nota leitina í excel / docs. Svo ég gerði þetta tól til að auðvelda manni lífið
      að leita í vörulistanum.
    </p>

    <p class="my-5">Allar upplýsingarnar á vefnum koma beint úr xls skjalinu frá Íhlutum.</p>

    <h3 class="text-3xl my-5">Nánari upplýsingar</h3>
    <p class="my-5">
      Þetta tól var búið til af Arnóri Heiðari Sigurðssyni (
      <InlineAnchor href="https://twitter.com/arnorhs">twitter</InlineAnchor>,{' '}
      <InlineAnchor href="https://arnorhs.dev">blog</InlineAnchor>) og allur kóðinn open source á{' '}
      <InlineAnchor href="https://github.com/arnorhs/elskaihluti">github</InlineAnchor> og
      breytingabeiðnir eru hjartanlega velkomnar.
    </p>
  </Container>
)
