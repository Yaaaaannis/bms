import React from 'react';
import styled from 'styled-components';

const RosterContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  overflow: hidden;
`

const PlayerSection = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;

  &:hover {
    flex: 4;

    .player-info {
      opacity: 1;
      transform: translateY(0);
    }

    .player-image {
      filter: brightness(0.7);
    }
  }
`

const PlayerImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: all 0.6s ease;
  filter: brightness(0.5);
`

const PlayerInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  color: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;

  h2 {
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    font-weight: 700;
  }

  .role {
    font-size: 1.2rem;
    color: #ffffff99;
    margin-bottom: 1rem;
  }

  .stats {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
    align-items: center;
  }

  .stat {
    text-align: center;
    
    .value {
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .label {
      font-size: 0.9rem;
      color: #ffffff99;
    }
  }

  .link {
    margin-left: auto;
    
    a {
      color: white;
      transition: all 0.3s ease;
      
      &:hover {
        opacity: 0.8;
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`

const PLAYERS = [
  {
    id: 1,
    name: "CRÈPE SALÉE",
    game: "SMASH BROS",
    image: "./crepe1.jpeg",
    link: "https://x.com/crepesaleessb",
    stats: "Best EU player"
  },
  {
    id: 2,
    name: "DOMBILI",
    game: "TEKKEN",
    image: "./dombili.jpeg",
    link: "https://x.com/DombiliMaymun",
    stats: "3eme at UFA 2024"
  },
  {
    id: 3,
    name: "LUUGI",
    game: "SMASH BROS",
    image: "./luugi.jpeg",
    link: "https://x.com/Mario_LuigiBIS",
    stats: "Futur Goat"
  },
  {
    id: 4,
    name: "NEEROZ",
    game: "SMASH BROS",
    image: "./neeroz.jpeg",
    link: "https://x.com/7Neeroz",
    stats: "Red Pikachu"
  },
  {
    id: 5,
    name: "WAWA",
    game: "DBFZ",
    image: "./wawa3.jpeg",
    link: "https://x.com/Wawa_FGC",
    stats: "EVO Champion"
  },
]

export default function Roster() {
  return (
    <RosterContainer>
      {PLAYERS.map((player) => (
        <PlayerSection key={player.id}>
          <PlayerImage className="player-image" image={player.image} />
          <PlayerInfo className="player-info">
            <h2>{player.name}</h2>
            <div className="role">{player.game}</div>
            <div className="stats">
              <div className="stat">
                <div className="value">{player.stats}</div>
              </div>
              <div className="link">
                <a href={player.link} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </PlayerInfo>
        </PlayerSection>
      ))}
    </RosterContainer>
  );
} 