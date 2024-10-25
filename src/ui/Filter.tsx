import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { characterData } from '../data/character-data.ts';
import { artifactTypesAndStats, artifactSets } from '../data/artifact-data.ts';
import { substats } from '../data/substats.ts';
import { elements } from '../data/elements.ts';
import { Character, ArtifactType, ArtifactSet } from '../types/types.ts';

export default function Filter({
  resetFilters,
  handleCharacterChange,
  handleArtifactSetChange,
  handleMainstatChange,
  handleSubstatsChange,
  handleElementsChange,
  selectedCharacter,
  selectedArtifactSet,
  selectedSands,
  selectedGoblet,
  selectedCirclet,
  selectedSubstats,
  selectedElements
} : {
  resetFilters: any;
  handleCharacterChange: any;
  handleArtifactSetChange: any;
  handleMainstatChange: any;
  handleSubstatsChange: any;
  handleElementsChange: any;
  selectedCharacter: any;
  selectedArtifactSet: any;
  selectedSands: any;
  selectedGoblet: any;
  selectedCirclet: any;
  selectedSubstats: any;
  selectedElements: any;
}) {

  // States
    const [characterQuery, setCharacterQuery] = useState<string>('');
    const [characterDropDownOpen, setCharacterDropDownOpen] = useState<boolean>(false);

    const [artifactQuery, setArtifactQuery] = useState<string>('');
    const [artifactSetDropDownOpen, setArtifactSetDropDownOpen] = useState<boolean>(false);

    const [sandsDropDownOpen, setSandsDropDownOpen] = useState<boolean>(false);
    const [gobletDropDownOpen, setGobletDropDownOpen] = useState<boolean>(false);
    const [circletDropDownOpen, setCircletDropDownOpen] = useState<boolean>(false);

  // Handle menu behaviours
    const handleDropDown = (menu: string) => {
      if(menu === 'Character') {
        setCharacterDropDownOpen(true);
      }
      if(menu === 'Artifact') {
        setArtifactSetDropDownOpen(true);
      }
      if(menu === 'Sands') {
        setSandsDropDownOpen(true);
      }
      if(menu === 'Goblet') {
        setGobletDropDownOpen(true);
      }
      if(menu === 'Circlet') {
        setCircletDropDownOpen(true);
      }
    }

  // Automatically focus the search inputs when opened
    const characterRef = useRef<HTMLInputElement>(null);
    const artifactRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (characterDropDownOpen && characterRef.current) {
        characterRef.current.focus();
      }
      if (artifactSetDropDownOpen && artifactRef.current) {
        artifactRef.current.focus();
      }
    }, [characterDropDownOpen, artifactSetDropDownOpen]);

  // Search queries
    const handleCharacterQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharacterQuery(e.target.value)
    }
    const handleArtifactQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
      setArtifactQuery(e.target.value)
    }

  // Filtered character data based on the query
    const filteredCharacterData = characterData.filter((character: Character) =>
      character.name.toLowerCase().includes(characterQuery.toLowerCase())
    );

  // Sort artifacts alphabetically
    const sortedArtifacts = artifactSets.sort((a: ArtifactSet, b: ArtifactSet) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  // Filtered artifact data based on the query
    const filteredArtifacts = sortedArtifacts.filter((set: ArtifactSet) =>
      set.name.toLowerCase().includes(artifactQuery.toLowerCase())
    );


  const characterDropDownRef = useRef<HTMLInputElement>(null);
  const artifactDropDownRef = useRef<HTMLInputElement>(null);
  const sandsDropDownRef = useRef<HTMLInputElement>(null);
  const gobletDropDownRef = useRef<HTMLInputElement>(null);
  const circletDropDownRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event) => {
    // Check if the click was outside the dropdown and button
    if (characterDropDownRef.current && !characterDropDownRef.current.contains(event.target)) {
      setCharacterDropDownOpen(false);
    }
    if (artifactDropDownRef.current && !artifactDropDownRef.current.contains(event.target)) {
      setArtifactSetDropDownOpen(false);
    }
    if (sandsDropDownRef.current && !sandsDropDownRef.current.contains(event.target)) {
      setSandsDropDownOpen(false);
    }
    if (gobletDropDownRef.current && !gobletDropDownRef.current.contains(event.target)) {
      setGobletDropDownOpen(false);
    }
    if (circletDropDownRef.current && !circletDropDownRef.current.contains(event.target)) {
      setCircletDropDownOpen(false);
    }
  };

  useEffect(() => {
    // Add the event listener when the dropdown is open
    if (characterDropDownOpen || artifactSetDropDownOpen || sandsDropDownOpen || gobletDropDownOpen || circletDropDownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener on component unmount or when dropdown closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [characterDropDownOpen, artifactSetDropDownOpen, sandsDropDownOpen, gobletDropDownOpen, circletDropDownOpen]);







  return (
    <section id="filter">

      {/* CHARACTER */}
      <div className="filter-card">
        <h2>Character</h2>
          <div ref={characterDropDownRef}>
          {/* If menu is open, render search bar */}
          {characterDropDownOpen ? (
            <>
            <div className="search-bar">
              {/* Input for filtering the character list */}
              <input
                className="search-input"
                ref={characterRef}
                value={characterQuery}
                onChange={handleCharacterQuery}
                placeholder={selectedCharacter.length === 1 ? selectedCharacter : "Type to begin searching"}
              />
            </div>
            </>
          ) : (
            <>
            {/* Else if menu is closed, render the dropdown toggle */}
            <div 
              onClick={() => handleDropDown('Character')} 
              className={selectedCharacter.length === 1 ? 'dropdown active' : 'dropdown'}>

              <p>
                {/* If character is selected, render their picture */}
                {selectedCharacter.length === 1 &&
                <img
                  src={`./images/characters/${selectedCharacter}.webp`}
                  alt={selectedCharacter}
                  style={{ width: '20px', marginRight: '10px' }}
                />}

                {/* If character is selected, display their name, otherwise placeholder text */}
                {selectedCharacter.length === 1 ? selectedCharacter : "Select a character"}
              </p>
            </div>
            
            {/* X button clear the input, if any */}
            {selectedCharacter.length === 1 &&
            <button
              className="clear-input"
              onClick={() => handleCharacterChange('clear selection')}>
              X
            </button>}
            </>
          )
        }
        {/* Dropdown is open */}
        {characterDropDownOpen && (
          <ul className="dropdown-menu">

            {/* If a character is selected, render a li to clear the selection */}
            {selectedCharacter.length === 1 &&
            <li 
              onClick={() => {
              
              setCharacterDropDownOpen(!characterDropDownOpen)
            }}>
              Clear selection
            </li>}

            {/* Render a li for every character in the filtered data */}
            {filteredCharacterData.map((character: Character) => (
              <li key={character.name + character.element} onClick={() => {
                handleCharacterChange(character.name)
                setCharacterDropDownOpen(!characterDropDownOpen)
                setCharacterQuery('')
              }}>

                {/* Character image */}
                <img
                  src={`./images/characters/${character.name}.webp`}
                  alt={character.name}
                  style={{ height: '64px', marginRight: '10px' }}
                />

                {/* Character name */}
                {character.name}
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
      
      {/* ARTIFACT SET */}
      <div className="filter-card">
        <h2>Artifact Set</h2>
        <div ref={artifactDropDownRef}>
          {artifactSetDropDownOpen ? (
            <>
            <div className="search-bar">
              <input
                className="search-input"
                ref={artifactRef}
                value={artifactQuery}
                onChange={handleArtifactQuery}
                placeholder={selectedArtifactSet.length === 1 ? selectedArtifactSet : "Type to begin searching"}
              />
            </div>
            </>
          ) : (
          <>
            <div 
              onClick={() => handleDropDown('Artifact')} 
              className={selectedArtifactSet.length === 1 ? 'dropdown active' : 'dropdown'}
            >
            <p>
              {/* {selectedArtifactSet.length > 0 &&
              <img
                src={`/images/characters/${selectedArtifactSet}.webp`}
                alt={selectedArtifactSet}
                style={{ width: '20px', marginRight: '10px' }}
              />}*/}
              {selectedArtifactSet.length > 0 ? selectedArtifactSet : "Select an artifact set"}
            </p>
          </div>

            {/* X button clear the input, if any */}
            {selectedArtifactSet.length === 1 &&
            <button
              className="clear-input"
              onClick={() => handleArtifactSetChange('clear selection')}>
              X
            </button>}
            </>

          )
        }
        {artifactSetDropDownOpen && (
          <ul className="dropdown-menu">
            {selectedArtifactSet.length === 1 &&
            <li onClick={() => {
              handleArtifactSetChange('clear selection')
              setArtifactSetDropDownOpen(!artifactSetDropDownOpen)
            }}>Clear selection</li>}

            {filteredArtifacts.map((set: ArtifactSet) => (
              <li key={set.name} onClick={() => {
                handleArtifactSetChange(set.name)
                setArtifactSetDropDownOpen(!artifactSetDropDownOpen)
                setArtifactQuery('')
              }}>
                {/* {selectedArtifactSet.length > 0 &&
                <img
                  src={`/images/characters/${selectedArtifactSet}.webp`}
                  alt={selectedArtifactSet}
                  style={{ width: '20px', marginRight: '10px' }}
                />}*/}
                {set.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>

      {/* ARTIFACT TYPE - SANDS/GOBLET/CIRCLET */}
      <div className="filter-card">
        {artifactTypesAndStats.map((artifact: ArtifactType) => (
          <React.Fragment key={artifact.name}>
            <h2>{artifact.name}</h2>

            {artifact.name === 'Sands' && 
              <div ref={sandsDropDownRef} >
              <div 
                className={selectedSands.length > 0 ? 'dropdown active' : 'dropdown'}
                onClick={() => handleDropDown('Sands')}
              >
                <p>{selectedSands.length > 0 ? selectedSands : 'Select a sands'}</p>
              </div>
              {sandsDropDownOpen && artifact.name === 'Sands' && (
                <ul className="dropdown-menu">

                  {selectedSands.length > 0 &&
                  <li onClick={() => {
                    handleMainstatChange('clear selection', artifact.name);
                    setSandsDropDownOpen(!sandsDropDownOpen);
                  }}>Clear selection</li>}

                  {artifact.stats.map((stat: string) => (
                    <li key={stat} onClick={() => {
                      handleMainstatChange(stat, artifact.name);
                      setSandsDropDownOpen(!sandsDropDownOpen);
                    }}>
                      {stat}
                    </li>
                  ))}
                </ul>
              )}
              </div>}

            {artifact.name === 'Goblet' && 
              <div ref={gobletDropDownRef}>
              <div 
                className={selectedGoblet.length > 0 ? 'dropdown active' : 'dropdown'}
                onClick={() => handleDropDown('Goblet')}
              >
                <p>{selectedGoblet.length > 0 ? selectedGoblet : 'Select a goblet'}</p>
              </div>
              {gobletDropDownOpen && artifact.name === 'Goblet' && (
                <ul className="dropdown-menu">

                  {selectedGoblet.length > 0 &&
                  <li onClick={() => {
                    handleMainstatChange('clear selection', artifact.name);
                    setGobletDropDownOpen(!gobletDropDownOpen);
                  }}>Clear selection</li>}

                  {artifact.stats.map((stat: string) => (
                    <li key={stat} onClick={() => {
                      handleMainstatChange(stat, artifact.name);
                      setGobletDropDownOpen(!gobletDropDownOpen);
                    }}>
                      {stat}
                    </li>
                  ))}
                </ul>
              )}
              </div>}

            {artifact.name === 'Circlet' && 
              <div ref={circletDropDownRef}>
              <div 
                className={selectedCirclet.length > 0 ? 'dropdown active' : 'dropdown'}
                onClick={() => handleDropDown('Circlet')}
              >
                <p>{selectedCirclet.length > 0 ? selectedCirclet : 'Select a circlet'}</p>
              </div>
              {circletDropDownOpen && artifact.name === 'Circlet' && (
                <ul className="dropdown-menu">

                  {selectedCirclet.length > 0 &&
                  <li onClick={() => {
                    handleMainstatChange('clear selection', artifact.name);
                    setCircletDropDownOpen(!circletDropDownOpen);
                  }}>Clear selection</li>}

                  {artifact.stats.map((stat: string) => (
                    <li key={stat} onClick={() => {
                      handleMainstatChange(stat, artifact.name);
                      setCircletDropDownOpen(!circletDropDownOpen);
                    }}>
                      {stat}
                    </li>
                  ))}
                </ul>
              )}
              </div>}

          </React.Fragment>
        ))}
      </div>

      {/* SUBSTATS */}
      <div className="filter-card">
        <h2>Substats</h2>
        {substats.map((stat: string) => (
          <label key={stat}>
            <input
              type="checkbox"
              checked={selectedSubstats.includes(stat)}
              onChange={() => handleSubstatsChange(stat)}
            />
            {stat}
          </label>
        ))}
      </div>

      {/* ELEMENTS */}
      <div className="filter-card">
        <h2>Element</h2>
        {elements.map((element: string) => (
          <label key={element}>
            <input
              type="checkbox"
              checked={selectedElements.includes(element)}
              onChange={() => handleElementsChange(element)}
            />
            {element}
          </label>
        ))}
      </div>

      <button onClick={() => resetFilters()}>Reset all filters</button>
    </section>
  );
}