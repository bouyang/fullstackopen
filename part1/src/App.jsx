// const Header = (props) => {
//   return (
//     <>
//       <h1>{props.course.name}</h1>
//     </>
//   )
// }

// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.course.parts[0]} />
//       <Part part={props.course.parts[1]} />
//       <Part part={props.course.parts[2]} />
//     </div>
//   )
// }

// const Part = (props) => {
//   return (
//     <p>
//       {props.part.name} {props.part.exercises}
//     </p>
//   )
// }

// const Total = (props) => {
//   let total = 0;
//   props.course.parts.forEach(number => {
//     total += number.exercises;
//   });

//   return (
//     <p>Number of exercises {total}</p>
//   )
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course} />
//       <Content course={course} />
//       <Total course={course} />
//     </div>
//   )
// }

// export default App


import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({goodCount, neutralCount, badCount}) => {
  let all = goodCount + neutralCount + badCount;
  let average = (goodCount - badCount) / all;
  let positive = goodCount / all;

  if (all > 0) {
    
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={goodCount} />
          <StatisticLine text='neutral' value={neutralCount} />
          <StatisticLine text='bad' value={badCount} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleGood = () => {
    let goodCount = good + 1;
    setGood(goodCount);
  }

  const handleNeutral = () => {
    let neutralCount = neutral + 1;
    setNeutral(neutralCount);
  }

  const handleBad = () => {
    let badCount = bad + 1;
    setBad(badCount);
  }

  const nextAnecdote = () => {
    let rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  }

  const voteAnecdote = () => {
    let copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  }

  const topAnecdote = () => {
    let top = points.indexOf(Math.max(...points));
    return (
      `${anecdotes[top]} has ${points[top]} votes`
    );
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      has {points[selected]} votes
      <Button handleClick={voteAnecdote} text='vote' />
      <Button handleClick={nextAnecdote} text='next anecdote' />

      <h1>Anecdote with most votes</h1>
      {topAnecdote()}
    
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <h1>statistics</h1>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />

    </div>
  )
}

export default App