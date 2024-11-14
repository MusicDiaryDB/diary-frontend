import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { 
  fetchGraphData, 
  fetchSongsReleasedByArtist, 
  fetchUsersWithMostEntries 
} from '../assets/services/graphService';

const Graphs: React.FC = () => {
  const userVisibilityRef = useRef<SVGSVGElement | null>(null);
  const songsByArtistRef = useRef<SVGSVGElement | null>(null);
  const usersMostEntriesRef = useRef<SVGSVGElement | null>(null);

  const [userVisibilityData, setUserVisibilityData] = useState<any[]>([]);
  const [songsByArtistData, setSongsByArtistData] = useState<any[]>([]);
  const [usersMostEntriesData, setUsersMostEntriesData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserVisibilityData(await fetchGraphData());
        setSongsByArtistData(await fetchSongsReleasedByArtist());
        setUsersMostEntriesData(await fetchUsersWithMostEntries());
      } catch (error) {
        setError('Could not fetch one or more graph data sets.');
        console.error("Error fetching graph data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    renderUserVisibilityGraph(); // Render User Visibility graph after data is fetched
    renderSongsByArtistGraph(); // Render Songs by Artist graph after data is fetched
  }, [userVisibilityData, songsByArtistData]);  // This effect will run when either dataset changes
  

  // D3 functions for each graph (you already have this code, no changes needed here)
  const renderUserVisibilityGraph = () => {
    if (!userVisibilityRef.current || userVisibilityData.length === 0) return;
  
    // Clear previous renderings
    const svg = d3.select(userVisibilityRef.current);
    svg.selectAll("*").remove();
  
    // Margin, width, and height settings for the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    // Set up scales for the graph
    const xScale = d3.scaleBand().range([0, width]).padding(0.1); // x scale for categorical data
    const yScale = d3.scaleLinear().range([height, 0]); // y scale for numerical data
  
    // Set the domain for the y-axis to range from 0 to 9 (the max value of user_count)
    const formattedData = userVisibilityData.map((row: any) => ({
      Visibility: row.Visibility,
      user_count: row.user_count,
    }));
  
    // Set the xScale domain to map visibility categories
    xScale.domain(formattedData.map((d: any) => d.Visibility)); // Categorical domain (Visibility)
    yScale.domain([0, 9]); // Explicit range from 0 to 9 on y-axis
  
    // Append the SVG element and set up the chart group
    svg.attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Add horizontal grid lines
    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(yScale.ticks(9)) // Set number of horizontal grid lines based on y-scale ticks
      .enter().append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d: any) => yScale(d))
      .attr('y2', (d: any) => yScale(d))
      .attr('stroke', '#ccc') // Light gray grid lines
      .attr('stroke-dasharray', '2,2'); // Optional: dashed lines
  
    // Add vertical grid lines
    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(formattedData)
      .enter().append('line')
      .attr('x1', (d: any) => xScale(d.Visibility) || 0) // Safeguard against undefined values
      .attr('x2', (d: any) => xScale(d.Visibility) || 0) // Same as above
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#ccc') // Light gray grid lines
      .attr('stroke-dasharray', '2,2'); // Optional: dashed lines
  
    // Append bars for each data entry
    svg.selectAll('.bar')
      .data(formattedData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => xScale(d.Visibility) || 0) // Safeguard against undefined values
      .attr('width', xScale.bandwidth()) // Width of the bars based on the scale
      .attr('y', (d: any) => yScale(d.user_count) || 0) // Default to 0 if undefined
      .attr('height', (d: any) => {
        const heightValue = height - (yScale(d.user_count) || 0);
        return heightValue > 0 ? heightValue : 0; // Ensure height is non-negative
      })
      .style('fill', (d: any) => d3.schemeCategory10[formattedData.indexOf(d) % 10]);
  
    // Add x-axis at the bottom
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));
  
    // Add y-axis on the left with a range from 0 to 9
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale)) // Using the yScale for axis generation
      .selectAll('.domain')  // Optionally, remove the axis line
      .remove();
  
    // Optional: Adding Y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left + 20)
      .attr('x', 0 - height / 2)
      .style('text-anchor', 'middle')
      .text('User Count');
  };

  const renderSongsByArtistGraph = () => {
    if (!songsByArtistRef.current || !songsByArtistData || songsByArtistData.length === 0) return;
  
    const svg = d3.select(songsByArtistRef.current);
    svg.selectAll("*").remove();  // Clear previous renderings
  
    const margin = { top: 20, right: 30, bottom: 60, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const x = d3.scaleBand()
      .domain(songsByArtistData.map((d: any) => d.Name))
      .range([0, width])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(songsByArtistData, (d: any) => d.total_songs) || 0])
      .range([height, 0]);
  
    svg.attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Add horizontal grid lines
    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(y.ticks(10))  // Create grid lines based on the y-scale ticks
      .enter().append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', (d: any) => y(d))
      .attr('y2', (d: any) => y(d))
      .attr('stroke', '#ccc') // Light gray grid lines
      .attr('stroke-dasharray', '2,2'); // Optional: dashed lines for grid
  
    // Add vertical grid lines
    svg.append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(songsByArtistData)
      .enter().append('line')
      .attr('x1', (d: any) => x(d.Name) || 0)  // Handle possible undefined values
      .attr('x2', (d: any) => x(d.Name) || 0)  // Handle possible undefined values
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#ccc') // Light gray grid lines
      .attr('stroke-dasharray', '2,2'); // Optional: dashed lines for grid
  
    // Render bars
    svg.append('g').selectAll('.bar')
      .data(songsByArtistData)
      .enter()
      .append('rect')
      .attr('x', (d: any) => x(d.Name) ?? 0)
      .attr('y', (d: any) => y(d.total_songs) ?? 0)
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => height - y(d.total_songs))
      .style('fill', (d: any) => d3.schemeCategory10[songsByArtistData.indexOf(d) % 10]);
  
    // Add x-axis and y-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    svg.append('g')
      .call(d3.axisLeft(y));
  
    // Optional: Adding X-axis label
    svg.append('text')
      .attr('transform', `translate(${width / 2},${height + margin.bottom - 10})`)
      .style('text-anchor', 'middle')
      .text('Artist');
  };

  // Table for "Users with Most Diary Entries"
  const renderUsersMostEntriesTable = () => {
    return (
      <div style={{ marginBottom: '20px' }}>
        <h3>Users with the Most Diary Entries</h3>
        <table style={{ width: '80%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Rank</th>
              <th style={tableHeaderStyle}>Username</th>
              <th style={tableHeaderStyle}>Total Entries</th>
            </tr>
          </thead>
          <tbody>
            {usersMostEntriesData.map((user, index) => (
              <tr key={user.UserID} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{user.Username}</td>
                <td style={tableCellStyle}>{user.total_entries}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Graph Reports</h2>
      {error && <p>{error}</p>}
  
      {/* User Visibility Graph */}
      <div style={{ marginBottom: '20px' }}>
        <h3>User Counts by Visibility</h3>
        <svg ref={userVisibilityRef} width="500" height="500"></svg>
      </div>
  
      {/* Songs Released by Artist Graph */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Songs Released by Artist</h3>
        <svg ref={songsByArtistRef} width="800" height="400"></svg>
      </div>
  
      {/* Users with Most Entries Table */}
      {renderUsersMostEntriesTable()}
      
    </div>
  );
};



const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: '#f4f4f4',
  padding: '10px',
  textAlign: 'left',  // You can use 'left', 'center', or 'right'
  fontWeight: 'bold',
  border: '1px solid #ddd',
};

const tableCellStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #ddd',
};

const evenRowStyle: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
};

const oddRowStyle: React.CSSProperties = {
  backgroundColor: '#fff',
};


export default Graphs;
