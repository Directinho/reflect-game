export default function Farol({ color, active }) {
  return (
    <div 
      style={{
        width: 80,
        height: 80, 
        borderRadius: '50%',
        display: 'flex',
        margin: '10px auto',
        alignItems: 'center',
        left: '500px',
        justifyContent: 'center',
        backgroundColor: active ? color : 'gray',
        boxShadow: active ? `0 0 25px ${color}` : 'none',
        transition: '0.3s',
        fontSize: '2rem'
      }}
    ></div>
  );
}
