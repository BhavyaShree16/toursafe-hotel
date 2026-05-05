// import { useState } from 'react'
// import '../styles/touristlist.css'

// const initialTourists = [
//   { id: 'TSF-4821', name: 'Rahul Sharma', initials: 'RS', nationality: 'Indian', phone: '+91 98765 43210', place: 'Dzukou Valley', checkIn: '24 Apr', checkOut: '28 Apr', purpose: 'Trekking', status: 'active' },
//   { id: 'TSF-4822', name: 'James Miller', initials: 'JM', nationality: 'British', phone: '+44 7700 900456', place: 'Living Root Bridge', checkIn: '22 Apr', checkOut: '26 Apr', purpose: 'Leisure', status: 'alert' },
//   { id: 'TSF-4823', name: 'Priya Kapoor', initials: 'PK', nationality: 'Indian', phone: '+91 87654 32109', place: 'Mawlynnong', checkIn: '23 Apr', checkOut: '25 Apr', purpose: 'Leisure', status: 'active' },
//   { id: 'TSF-4824', name: 'Akira Tanaka', initials: 'AT', nationality: 'Japanese', phone: '+81 90 1234 5678', place: 'Ziro Valley', checkIn: '18 Apr', checkOut: '22 Apr', purpose: 'Trekking', status: 'departed' },
//   { id: 'TSF-4825', name: 'Sophie Laurent', initials: 'SL', nationality: 'French', phone: '+33 6 12 34 56 78', place: 'Tawang Monastery', checkIn: '16 Apr', checkOut: '20 Apr', purpose: 'Pilgrimage', status: 'departed' },
//   { id: 'TSF-4826', name: 'Mohammed Al-Rashid', initials: 'MA', nationality: 'UAE', phone: '+971 50 123 4567', place: 'Shillong', checkIn: '25 Apr', checkOut: '30 Apr', purpose: 'Leisure', status: 'active' },
//   { id: 'TSF-4827', name: 'Elena Petrov', initials: 'EP', nationality: 'Russian', phone: '+7 912 345 6789', place: 'Cherrapunji', checkIn: '26 Apr', checkOut: '29 Apr', purpose: 'Adventure', status: 'active' },
//   { id: 'TSF-4828', name: 'David Chen', initials: 'DC', nationality: 'Singaporean', phone: '+65 9123 4567', place: 'Dzukou Valley', checkIn: '20 Apr', checkOut: '23 Apr', purpose: 'Trekking', status: 'departed' },
// ]

// const TABS = ['all', 'active', 'alert', 'departed']

// export default function TouristList() {
//   const [tourists, setTourists] = useState(initialTourists)
//   const [search, setSearch] = useState('')
//   const [activeTab, setActiveTab] = useState('all')
//   const [selectedId, setSelectedId] = useState(null)
//   const [mode, setMode] = useState('view') // 'view' | 'edit'
//   const [editForm, setEditForm] = useState({})
//   const [toast, setToast] = useState(null)

//   const showToast = (msg, type = 'success') => {
//     setToast({ msg, type })
//     setTimeout(() => setToast(null), 3000)
//   }

//   const filtered = tourists.filter(t => {
//     const matchesTab = activeTab === 'all' || t.status === activeTab
//     const q = search.toLowerCase()
//     const matchesSearch =
//       t.name.toLowerCase().includes(q) ||
//       t.nationality.toLowerCase().includes(q) ||
//       t.place.toLowerCase().includes(q) ||
//       t.id.toLowerCase().includes(q)
//     return matchesTab && matchesSearch
//   })

//   const counts = {
//     all: tourists.length,
//     active: tourists.filter(t => t.status === 'active').length,
//     alert: tourists.filter(t => t.status === 'alert').length,
//     departed: tourists.filter(t => t.status === 'departed').length,
//   }

//   const selected = tourists.find(t => t.id === selectedId)

//   const openDrawer = (t) => {
//     setSelectedId(t.id)
//     setMode('view')
//     setEditForm({ ...t })
//   }

//   const closeDrawer = () => {
//     setSelectedId(null)
//     setMode('view')
//   }

//   const handleMarkDeparted = () => {
//     setTourists(prev =>
//       prev.map(t => t.id === selectedId ? { ...t, status: 'departed' } : t)
//     )
//     showToast(`${selected.name} marked as departed`)
//     closeDrawer()
//   }

//   const handleRaiseAlert = () => {
//     setTourists(prev =>
//       prev.map(t => t.id === selectedId ? { ...t, status: 'alert' } : t)
//     )
//     showToast(`Alert raised for ${selected.name}`, 'alert')
//     closeDrawer()
//   }

//   const handleEditSave = () => {
//     setTourists(prev =>
//       prev.map(t => t.id === selectedId ? { ...editForm } : t)
//     )
//     setMode('view')
//     showToast('Tourist details updated')
//   }

//   return (
//     <div className="tl-page">

//       {/* Toast */}
//       {toast && (
//         <div className={`tl-toast tl-toast-${toast.type}`}>
//           {toast.msg}
//         </div>
//       )}

//       {/* Header */}
//       <div className="tl-header">
//         <div>
//           <h1 className="tl-title">Tourist List</h1>
//           <p className="tl-subtitle">All tourists registered by your hotel</p>
//         </div>
//         <div className="tl-count">{filtered.length} tourists</div>
//       </div>

//       {/* Controls */}
//       <div className="tl-controls">
//         <input
//           className="tl-search"
//           placeholder="Search by name, nationality, destination, ID..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//         <div className="tl-tabs">
//           {TABS.map(tab => (
//             <button
//               key={tab}
//               className={`tl-tab ${activeTab === tab ? 'tl-tab-active' : ''}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               <span className={`tl-tab-count tl-tab-count-${tab}`}>
//                 {counts[tab]}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="tl-table-wrap">
//         {filtered.length === 0 ? (
//           <div className="tl-empty">No tourists match your search</div>
//         ) : (
//           <table className="tl-table">
//             <thead>
//               <tr>
//                 <th>TOURIST</th>
//                 <th>ID</th>
//                 <th>PHONE</th>
//                 <th>DESTINATION</th>
//                 <th>PURPOSE</th>
//                 <th>CHECK-IN</th>
//                 <th>CHECK-OUT</th>
//                 <th>STATUS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map(t => (
//                 <tr
//                   key={t.id}
//                   className={`tl-row ${selectedId === t.id ? 'tl-row-selected' : ''}`}
//                   onClick={() => openDrawer(t)}
//                 >
//                   <td>
//                     <div className="tl-tourist-cell">
//                       <div className={`tl-avatar tl-avatar-${t.status}`}>{t.initials}</div>
//                       <div>
//                         <p className="tl-name">{t.name}</p>
//                         <span className="tl-nationality">{t.nationality}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td><span className="tl-id">{t.id}</span></td>
//                   <td className="tl-phone">{t.phone}</td>
//                   <td>{t.place}</td>
//                   <td>{t.purpose}</td>
//                   <td>{t.checkIn}</td>
//                   <td>{t.checkOut}</td>
//                   <td>
//                     <span className={`tl-status tl-status-${t.status}`}>
//                       {t.status === 'alert' ? 'SOS Alert' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Drawer */}
//       {selected && (
//         <div className="tl-drawer">

//           <div className="tl-drawer-header">
//             <div className={`tl-avatar tl-avatar-lg tl-avatar-${selected.status}`}>
//               {selected.initials}
//             </div>
//             <div className="tl-drawer-title-wrap">
//               <p className="tl-drawer-name">{selected.name}</p>
//               <span className={`tl-status tl-status-${selected.status}`}>
//                 {selected.status === 'alert' ? 'SOS Alert' : selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
//               </span>
//             </div>
//             <button className="tl-drawer-close" onClick={closeDrawer}>✕</button>
//           </div>

//           {/* Mode toggle */}
//           <div className="tl-drawer-tabs">
//             <button
//               className={`tl-drawer-tab ${mode === 'view' ? 'tl-drawer-tab-active' : ''}`}
//               onClick={() => setMode('view')}
//             >Details</button>
//             <button
//               className={`tl-drawer-tab ${mode === 'edit' ? 'tl-drawer-tab-active' : ''}`}
//               onClick={() => setMode('edit')}
//             >Edit</button>
//           </div>

//           {mode === 'view' ? (
//             <>
//               <div className="tl-drawer-body">
//                 {[
//                   ['Tourist ID', selected.id],
//                   ['Nationality', selected.nationality],
//                   ['Phone', selected.phone],
//                   ['Destination', selected.place],
//                   ['Purpose', selected.purpose],
//                   ['Check-in', selected.checkIn],
//                   ['Check-out', selected.checkOut],
//                 ].map(([label, value]) => (
//                   <div className="tl-drawer-row" key={label}>
//                     <span>{label}</span>
//                     <strong>{value}</strong>
//                   </div>
//                 ))}
//               </div>

//               {/* Actions */}
//               <div className="tl-drawer-actions">
//                 {selected.status !== 'departed' && (
//                   <button className="tl-action-departed" onClick={handleMarkDeparted}>
//                     Mark as Departed
//                   </button>
//                 )}
//                 {selected.status === 'active' && (
//                   <button className="tl-action-alert" onClick={handleRaiseAlert}>
//                     Raise Alert
//                   </button>
//                 )}
//                 {selected.status === 'departed' && (
//                   <p className="tl-departed-note">Tourist has checked out</p>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="tl-drawer-body tl-edit-body">
//                 {[
//                   { label: 'Full Name', key: 'name', type: 'text' },
//                   { label: 'Phone', key: 'phone', type: 'text' },
//                   { label: 'Nationality', key: 'nationality', type: 'text' },
//                   { label: 'Destination', key: 'place', type: 'text' },
//                   { label: 'Check-out Date', key: 'checkOut', type: 'text' },
//                 ].map(({ label, key, type }) => (
//                   <div className="tl-edit-field" key={key}>
//                     <label className="tl-edit-label">{label}</label>
//                     <input
//                       className="tl-edit-input"
//                       type={type}
//                       value={editForm[key] || ''}
//                       onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="tl-drawer-actions">
//                 <button className="tl-action-save" onClick={handleEditSave}>Save Changes</button>
//                 <button className="tl-action-cancel" onClick={() => setMode('view')}>Cancel</button>
//               </div>
//             </>
//           )}

//         </div>
//       )}

//     </div>
//   )
// // }
import { useEffect, useState } from 'react'
import api from '../api/axios'
import '../styles/touristlist.css'

const TABS = ['all', 'active', 'alert', 'departed']

export default function TouristList() {
  const [tourists, setTourists] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/api/tourists')
      .then(({ data }) => setTourists(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = tourists.filter(t => {
    const matchesTab = activeTab === 'all' || t.status === activeTab
    const q = search.toLowerCase()
    const matchesSearch =
      t.name.toLowerCase().includes(q) ||
      t.nationality.toLowerCase().includes(q) ||
      t.place.toLowerCase().includes(q) ||
      t.touristId?.toLowerCase().includes(q)
    return matchesTab && matchesSearch
  })

  const counts = {
    all: tourists.length,
    active: tourists.filter(t => t.status === 'active').length,
    alert: tourists.filter(t => t.status === 'alert').length,
    departed: tourists.filter(t => t.status === 'departed').length,
  }

  const initials = (name) =>
    name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  if (loading) return <div style={{ padding: 40, color: '#94a3b8' }}>Loading tourists...</div>

  return (
    <div className="tl-page">
      <div className="tl-header">
        <div>
          <h1 className="tl-title">Tourist List</h1>
          <p className="tl-subtitle">All tourists registered by your hotel</p>
        </div>
        <div className="tl-count">{filtered.length} tourists</div>
      </div>

      <div className="tl-controls">
        <input className="tl-search"
          placeholder="Search by name, nationality, destination, ID..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <div className="tl-tabs">
          {TABS.map(tab => (
            <button key={tab}
              className={`tl-tab ${activeTab === tab ? 'tl-tab-active' : ''}`}
              onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className={`tl-tab-count tl-tab-count-${tab}`}>{counts[tab]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tl-table-wrap">
        {filtered.length === 0 ? (
          <div className="tl-empty">
            {tourists.length === 0
              ? 'No tourists registered yet.'
              : 'No tourists match your search.'}
          </div>
        ) : (
          <table className="tl-table">
            <thead>
              <tr>
                <th>TOURIST</th>
                <th>ID</th>
                <th>PHONE</th>
                <th>DESTINATION</th>
                <th>PURPOSE</th>
                <th>CHECK-IN</th>
                <th>CHECK-OUT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t._id}
                  className={`tl-row ${selected === t._id ? 'tl-row-selected' : ''}`}
                  onClick={() => setSelected(selected === t._id ? null : t._id)}>
                  <td>
                    <div className="tl-tourist-cell">
                      <div className={`tl-avatar tl-avatar-${t.status}`}>{initials(t.name)}</div>
                      <div>
                        <p className="tl-name">{t.name}</p>
                        <span className="tl-nationality">{t.nationality}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="tl-id">{t.touristId}</span></td>
                  <td className="tl-phone">{t.phone}</td>
                  <td>{t.place}</td>
                  <td>{t.purpose}</td>
                  <td>{t.checkIn}</td>
                  <td>{t.checkOut}</td>
                  <td>
                    <span className={`tl-status tl-status-${t.status}`}>
                      {t.status === 'alert' ? 'SOS Alert' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (() => {
        const t = tourists.find(x => x._id === selected)
        if (!t) return null
        return (
          <div className="tl-drawer">
            <div className="tl-drawer-header">
              <div className={`tl-avatar tl-avatar-lg tl-avatar-${t.status}`}>{initials(t.name)}</div>
              <div>
                <p className="tl-drawer-name">{t.name}</p>
                <span className={`tl-status tl-status-${t.status}`}>
                  {t.status === 'alert' ? 'SOS Alert' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
              </div>
              <button className="tl-drawer-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="tl-drawer-body">
              <div className="tl-drawer-row"><span>Tourist ID</span><strong>{t.touristId}</strong></div>
              <div className="tl-drawer-row"><span>Nationality</span><strong>{t.nationality}</strong></div>
              <div className="tl-drawer-row"><span>Phone</span><strong>{t.phone}</strong></div>
              <div className="tl-drawer-row"><span>Room</span><strong>{t.roomNumber}</strong></div>
              <div className="tl-drawer-row"><span>Destination</span><strong>{t.place}</strong></div>
              <div className="tl-drawer-row"><span>Purpose</span><strong>{t.purpose}</strong></div>
              <div className="tl-drawer-row"><span>Check-in</span><strong>{t.checkIn}</strong></div>
              <div className="tl-drawer-row"><span>Check-out</span><strong>{t.checkOut}</strong></div>
              <div className="tl-drawer-row"><span>Emergency</span><strong>{t.emergencyName}</strong></div>
              <div className="tl-drawer-row"><span>Emg. Phone</span><strong>{t.emergencyPhone}</strong></div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}