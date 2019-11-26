## Question Score Data Specification

### Data Format

Question Score data is saved in a multidimensional array. Below is a simple exmaple of a "score" that combines two question results:

```json
{
  "score": [
    ["id.UUID.test", "value.UUID.score", "operator.+", "value.static.5.4"]
  ]
}
```

Lets break the array values down.

1. First is always the "id" row, which specifies the unique ID for this score and the name of the score.
2. Next we get out first value row, which specifies a value source, or a static value. This row could also be a conditional statement.
3. Third is an operator row, which tells us how to combine the next value row with the first one.

Lets take a look at an exmaple with conditional rows:

```json
{
  "score": [
    [
      "id.UUID.test 2",
      "conditional.if",
      "value.UUID.score",
      "comparator.>",
      "value.static.5.4",
      "conditional.then",
      "value.UUID.score",
      "conditional.else",
      "value.UUID.score",
      "conditional.end"
    ]
  ]
}
```
