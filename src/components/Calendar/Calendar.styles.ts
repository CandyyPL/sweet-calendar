import styled from 'styled-components'

export const CalendarWrapper = styled.div`
  width: 600px;
  height: 500px;

  background-color: #222;

  border-radius: 10px;
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .top {
    width: 100%;
    height: 15%;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      width: 15%;
      height: 80%;

      margin-inline: 20px;
      border-radius: 5px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 26px;
      font-family: sans-serif;
      color: #ddd;

      &:not(.month) {
        cursor: pointer;

        &:hover {
          background-color: #666;
        }
      }
    }

    .month {
      width: 50%;

      font-size: 32px;
    }
  }

  .middle {
    width: 100%;
    height: 80%;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
  }
`

export const CalendarElement = styled.div`
  width: 75%;
  height: 90%;

  border-radius: 5px;
  margin: 2px;

  place-self: center;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-family: sans-serif;
  color: #eee;

  &.prior,
  &.next {
    color: #666;
  }

  &:not(.wd, .prior, .next) {
    cursor: pointer;

    &:nth-child(7n - 1),
    &:nth-child(7n) {
      color: #e0515d;
    }

    &:hover {
      background-color: #666;
    }
  }
`
