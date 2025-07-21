'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import AkiraBackground from './AkiraBackground'
import AkiraGlitchText from './AkiraGlitchText'
import dynamic from 'next/dynamic'

// Type definitions for Leaflet
declare global {
  interface Window {
    L: any
  }
}

interface MapData {
  latitude: number
  longitude: number
  content: string
  imageUrl: string
  linkUrl: string
  iconFlag: string
  customText: string
  descriptionText: string
}

// Map component that only renders on client side
function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [map, setMap] = useState<any>(null)
  const mapInstanceRef = useRef<any>(null)
  const [activeMarkers, setActiveMarkers] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only load Leaflet on client side after component is mounted
    if (!isMounted || typeof window === 'undefined') return

    const loadLeaflet = async () => {

      // Load Leaflet CSS
      const cssLink = document.createElement('link')
      cssLink.rel = 'stylesheet'
      cssLink.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
      document.head.appendChild(cssLink)

      // Load custom CSS
      const locateCSS = document.createElement('link')
      locateCSS.rel = 'stylesheet'
      locateCSS.href = '/map/css/L.Control.Locate.min.css'
      document.head.appendChild(locateCSS)

      const sidebarCSS = document.createElement('link')
      sidebarCSS.rel = 'stylesheet'
      sidebarCSS.href = '/map/css/leaflet-sidebar.min.css'
      document.head.appendChild(sidebarCSS)

      // Load Leaflet JS
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
      script.onload = () => {
        // Load plugins
        const locateScript = document.createElement('script')
        locateScript.src = '/map/js/L.Control.Locate.min.js'
        locateScript.onload = () => {
          const sidebarScript = document.createElement('script')
          sidebarScript.src = '/map/js/leaflet-sidebar.min.js'
          sidebarScript.onload = () => {
            initializeMap()
          }
          document.head.appendChild(sidebarScript)
        }
        document.head.appendChild(locateScript)
      }
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.L) return
      
      // Check if map is already initialized
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }

      try {
        // Clear any existing map content
        mapRef.current.innerHTML = ''
        
        // Initialize map
        const mapInstance = window.L.map(mapRef.current, {
          minZoom: 3
        }).setView([35.7294069, 139.7107928], 13)

        // Add OpenStreetMap tiles with AKIRA styling
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          opacity: 0.3,
          className: 'grayscale contrast-125 brightness-75'
        }).addTo(mapInstance)

        // Zoom info control
        const ZoomInfoControl = window.L.Control.extend({
          options: {
            position: 'topright'
          },
          onAdd: function(map: any) {
            const container = window.L.DomUtil.create('div', 'zoom-info-control')
            container.innerHTML = 'Lv: ' + map.getZoom()
            container.style.cssText = `
              padding: 6px 8px;
              font-size: 14px;
              font-family: 'Darumadrop One', cursive;
              background: white;
              box-shadow: 0 0 5px rgba(0,0,0,0.2);
              border-radius: 5px;
            `
            map.on('zoomend', function() {
              container.innerHTML = 'Lv: ' + map.getZoom()
            })
            return container
          }
        })
        mapInstance.addControl(new ZoomInfoControl())

        // Position zoom control
        mapInstance.zoomControl.setPosition('topright')

        // Add locate control
        const locateControl = window.L.control.locate({
          position: 'topright',
          strings: {
            title: "現在地を表示",
            popup: "現在地はココ"
          },
          locateOptions: {
            maxZoom: 18
          }
        }).addTo(mapInstance)

        // Add crosshair marker
        const crossIcon = window.L.icon({
          iconUrl: 'https://maps.gsi.go.jp/image/map/crosshairs.png',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })

        const crossMarker = window.L.marker(mapInstance.getCenter(), {
          icon: crossIcon,
          zIndexOffset: 1000,
          interactive: false
        }).addTo(mapInstance)

        mapInstance.on('move', function() {
          crossMarker.setLatLng(mapInstance.getCenter())
        })

        // Define icons
        const icons = {
          icon1: window.L.icon({
            iconUrl: '/map/icon.png',
            iconSize: [95, 95],
            iconAnchor: [22, 70],
            popupAnchor: [13, -45]
          }),
          icon2: window.L.icon({
            iconUrl: '/map/icon2.png',
            iconSize: [95, 95],
            iconAnchor: [22, 70],
            popupAnchor: [13, -45]
          }),
          icon3: window.L.icon({
            iconUrl: '/map/icon3.png',
            iconSize: [95, 95],
            iconAnchor: [22, 70],
            popupAnchor: [13, -45]
          }),
          icon4: window.L.icon({
            iconUrl: '/map/icon4.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [13, -45]
          }),
          icon5: window.L.icon({
            iconUrl: '/map/icon5.png',
            iconSize: [95, 95],
            iconAnchor: [22, 70],
            popupAnchor: [13, -45]
          }),
          icon6: window.L.icon({
            iconUrl: '/map/icon6.png',
            iconSize: [95, 95],
            iconAnchor: [22, 70],
            popupAnchor: [13, -45]
          }),
          icon7: window.L.icon({
            iconUrl: '/map/icon7.gif',
            iconSize: [90, 90],
            iconAnchor: [22, 70],
            popupAnchor: [13, -45]
          }),
          icon8: window.L.icon({
            iconUrl: '/map/icon8.png',
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [13, -45]
          }),
          icon9: window.L.icon({
            iconUrl: '/map/icon9.png',
            iconSize: [60, 60],
            iconAnchor: [30, 60],
            popupAnchor: [13, -45]
          }),
          icon10: window.L.icon({
            iconUrl: '/map/icon10.png',
            iconSize: [60, 60],
            iconAnchor: [30, 60],
            popupAnchor: [13, -45]
          })
        }

        // Fetch and add markers from Google Sheets
        fetchSpreadsheetData(mapInstance, icons)

        setMap(mapInstance)
        mapInstanceRef.current = mapInstance
        setIsLoading(false)

      } catch (error) {
        console.error('Error initializing map:', error)
        setIsLoading(false)
      }
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isMounted])

  const fetchSpreadsheetData = async (mapInstance: any, icons: any) => {
    try {
      const spreadsheetId = '1v713hgtLaMM3gaWKLen3oxdKk-FhNdtBSgbhykNe85s'
      const range = 'Sheet1!A2:H'
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || 'AIzaSyAF-mpyDJIMRcwZp4t6ZUMWsbo4JT0PNX0'

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.values) {
        addMarkersToMap(mapInstance, data.values, icons)
        setActiveMarkers(data.values.length)
      }
    } catch (error) {
      console.error('Error fetching spreadsheet data:', error)
    }
  }

  const addMarkersToMap = (mapInstance: any, data: any[], icons: any) => {
    data.forEach((row: any[]) => {
      const latitude = parseFloat(row[0])
      const longitude = parseFloat(row[1])
      const content = row[2] || ''
      const imageUrl = row[3] || ''
      const linkUrl = row[4] || ''
      const iconFlag = row[5] || '1'
      const customText = row[6] || ''
      const descriptionText = row[7] || 'ここでは、大切なものが見つけられるかもしれません。'

      if (isNaN(latitude) || isNaN(longitude)) return

      // Select icon based on flag
      let selectedIcon = icons.icon1
      const iconKey = `icon${iconFlag}` as keyof typeof icons
      if (icons[iconKey]) {
        selectedIcon = icons[iconKey]
      }

      // Create popup content
      const link = linkUrl ? `<a href="${linkUrl}" target="_blank">${customText}</a>` : customText
      const imageHtml = imageUrl ? `<img src="${imageUrl}" alt="Image" style="width:100%;height:auto;">` : ''
      const popupContent = `${content}<br>${imageHtml}<br>${link}<br><span style="font-size: 11px;">${descriptionText}</span>`

      // Add marker
      const marker = window.L.marker([latitude, longitude], {
        icon: selectedIcon,
        riseOnHover: true
      }).addTo(mapInstance)
      
      marker.bindPopup(popupContent)
    })
  }

  const jumpToOsaka = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([34.68869925776078, 135.52476523948252], 13)
    }
  }

  // Don't render anything until mounted on client
  if (!isMounted) {
    return (
      <div className="relative min-h-screen bg-black overflow-hidden">
        <AkiraBackground />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="font-mono text-sm text-white">INITIALIZING_MAP_SYSTEM...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AkiraBackground />
      
      {/* AKIRA-style Terminal Header with proper spacing */}
      <motion.div 
        className="relative bg-black border-b border-gray-700 pt-24 pb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="text-xs text-gray-500 font-mono mb-6">
            [SYSTEM_MAP_VIEWER_v2.025] &gt; LOADING_COMPLETE &gt; STANDBY_MODE
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <AkiraGlitchText 
              text="ドーナツぶちょうとたからのちず"
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider mb-6"
            />
          </motion.div>
          
          <motion.p 
            className="text-gray-400 text-sm max-w-2xl font-mono mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            部長が待っている場所を探索せよ。デジタル空間に散らばった宝の在り処を可視化。
          </motion.p>
          
          <div className="flex items-center space-x-4 text-xs font-mono text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>SYSTEM_ONLINE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>MARKERS_LOADED: {activeMarkers}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Terminal Legend & Instructions Panel */}
      <motion.div 
        className="bg-gray-900/50 border-b border-gray-700 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Icon Legend Section */}
            <div className="lg:col-span-2">
              <div className="text-xs text-gray-500 font-mono mb-6 flex items-center">
                <span className="mr-3">[ICON_LEGEND_DATABASE]</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              <div className="bg-black/50 border border-gray-700 p-6">
                <div className="text-sm text-white font-mono mb-4 uppercase tracking-wider">
                  アイコンの説明
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Icon 1 - 部長スポット */}
                  <motion.div 
                    className="flex flex-col items-center p-3 bg-gray-800/50 border border-gray-600 hover:border-white hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src="/map/icon.png" 
                      alt="部長スポット" 
                      className="w-12 h-12 mb-2 filter brightness-90 contrast-110"
                    />
                    <div className="text-xs text-gray-300 font-mono text-center">
                      <div className="text-white font-bold">部長スポット</div>
                      <div>特別なNFTを無料で入手</div>
                      <div className="text-green-400 text-[10px] mt-1">NFTミントスポット</div>
                    </div>
                  </motion.div>

                  {/* Icon 2 - 幸運な場所 */}
                  <motion.div 
                    className="flex flex-col items-center p-3 bg-gray-800/50 border border-gray-600 hover:border-white hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src="/map/icon2.png" 
                      alt="幸運な場所" 
                      className="w-12 h-12 mb-2 filter brightness-90 contrast-110"
                    />
                    <div className="text-xs text-gray-300 font-mono text-center">
                      <div className="text-white font-bold">幸運な場所</div>
                      <div>ラッキースポット</div>
                      <div className="text-green-400 text-[10px] mt-1">何かが起こる場所</div>
                    </div>
                  </motion.div>

                  {/* Icon 3 - ゲームスポット */}
                  <motion.div 
                    className="flex flex-col items-center p-3 bg-gray-800/50 border border-gray-600 hover:border-white hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src="/map/icon3.png" 
                      alt="ゲームスポット" 
                      className="w-12 h-12 mb-2 filter brightness-90 contrast-110"
                    />
                    <div className="text-xs text-gray-300 font-mono text-center">
                      <div className="text-white font-bold">ゲームスポット</div>
                      <div>どこからでもアクセス可能</div>
                      <div className="text-green-400 text-[10px] mt-1">ゲームを遊べます</div>
                    </div>
                  </motion.div>

                  {/* Icon 5 - 動くドローン */}
                  <motion.div 
                    className="flex flex-col items-center p-3 bg-gray-800/50 border border-gray-600 hover:border-white hover:bg-gray-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src="/map/icon5.png" 
                      alt="動くドローン" 
                      className="w-12 h-12 mb-2 filter brightness-90 contrast-110"
                    />
                    <div className="text-xs text-gray-300 font-mono text-center">
                      <div className="text-white font-bold">動くドローン</div>
                      <div>まれに出現する動くアイコン</div>
                      <div className="text-green-400 text-[10px] mt-1">クリックできたら豪運</div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-900/80 border border-gray-600">
                  <div className="text-xs text-gray-400 font-mono mb-2">
                    [LEGEND_NOTICE]
                  </div>
                  <p className="text-xs text-gray-300 font-mono leading-relaxed">
                    各スポットでは、もしかしたら現在進行形でNFTやその他の熱狂的なイベントが開催中かもしれません。<br />
                    それとも、イベントはとっくに終了していて、過去の記憶にしか存在しないかもしれませんが、<br />
                    部長はこの場所で、誰かがやってきて自分の分身を手に入れてくれるのを、ただ待ち続けています。
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Instructions */}
            <div>
              <div className="text-xs text-gray-500 font-mono mb-6 flex items-center">
                <span className="mr-3">[NAVIGATION_PROTOCOLS]</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              </div>
              
              <div className="space-y-4">
                <motion.div 
                  className="bg-black/50 border border-gray-700 p-4 hover:border-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <span className="text-white font-mono text-sm font-bold">CLICK_ACTION</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono ml-6">
                    マーカーをクリックで詳細表示
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-black/50 border border-gray-700 p-4 hover:border-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <span className="text-white font-mono text-sm font-bold">ZOOM_MODE</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono ml-6">
                    ズーム操作で精密探索モード
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-black/50 border border-gray-700 p-4 hover:border-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <span className="text-white font-mono text-sm font-bold">LOCATE_FUNC</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono ml-6">
                    現在地ボタンで位置特定
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-black/50 border border-gray-700 p-4 hover:border-white transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-white font-mono text-sm font-bold">FREE_MINT</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono ml-6">
                    ガス代（手数料）不要で受け取り可能
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Terminal Control Panel */}
      <motion.div 
        className="bg-gray-900/30 border-b border-gray-700 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="text-xs text-gray-500 font-mono mb-4">
            [QUICK_ACCESS_COMMANDS]
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.button 
              className="border border-gray-600 text-gray-400 px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-gray-700 hover:border-white hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">🔧</span>修理中…
            </motion.button>
            <motion.a 
              href="https://opensea.io/collection/wearable-donuts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-gray-600 text-gray-300 px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-gray-700 hover:border-white hover:text-white transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">👁</span>部長を見てみる
            </motion.a>
            <motion.button 
              onClick={jumpToOsaka}
              className="bg-white text-black px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">📍</span>大阪へジャンプ
            </motion.button>
            <motion.a 
              href="https://twitter.com/WinstonDreamer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-gray-600 text-gray-400 px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-gray-700 hover:border-white hover:text-white transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">💬</span>問い合わせ（工事中）
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Map Container */}
      <motion.div 
        className="relative bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="text-xs text-gray-500 font-mono mb-4">
            [MAP_VIEWER_INTERFACE]
          </div>
          
          {isLoading && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-40">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-sm text-white">INITIALIZING_MAP_SYSTEM...</p>
                  <p className="font-mono text-xs text-gray-400">[LOADING_COORDINATES]</p>
                  <p className="font-mono text-xs text-gray-400">[CONNECTING_TO_SATELLITE]</p>
                  <p className="font-mono text-xs text-gray-400">[RENDERING_MARKERS]</p>
                </div>
              </div>
            </div>
          )}
          
          <div 
            ref={mapRef} 
            className="w-full border border-gray-700 bg-gray-900 relative overflow-hidden"
            style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}
          >
            {/* Overlay grid for cyberpunk effect */}
            <div className="absolute inset-0 pointer-events-none z-10" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
              `,
              backgroundSize: '25px 25px'
            }} />
          </div>
        </div>
      </motion.div>

      {/* Terminal Sidebar */}
      <motion.div 
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="bg-black border border-gray-700 p-1">
          <div className="text-xs text-gray-500 font-mono mb-2 px-2 py-1">
            [EXTERNAL_LINKS]
          </div>
          <div className="space-y-1">
            <motion.a 
              href="https://www.mooon.app/ja/collections/DFwGiFMGCsN2QJxbkNpH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-xs font-mono"
              whileHover={{ scale: 1.05, x: 5 }}
              title="Globe"
            >
              <span>🌐</span><span>GLOBE</span>
            </motion.a>
            <motion.a 
              href="https://twitter.com/WinstonDreamer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-xs font-mono"
              whileHover={{ scale: 1.05, x: 5 }}
              title="Twitter"
            >
              <span>𝕏</span><span>TWITTER</span>
            </motion.a>
            <motion.a 
              href="https://app.box.com/s/9hhwj1uhchcv4u6qsbcqqpm5wewe8x03" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-xs font-mono"
              whileHover={{ scale: 1.05, x: 5 }}
              title="Shop"
            >
              <span>🏪</span><span>SHOP</span>
            </motion.a>
            <motion.a 
              href="https://stand.fm/channels/60eaee4a04bb1691c12aa547" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-xs font-mono"
              whileHover={{ scale: 1.05, x: 5 }}
              title="Audio"
            >
              <span>📻</span><span>AUDIO</span>
            </motion.a>
            <motion.a 
              href="https://discord.gg/4hcyMpHqF9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-xs font-mono"
              whileHover={{ scale: 1.05, x: 5 }}
              title="Discord"
            >
              <span>💬</span><span>DISCORD</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Dynamic import to prevent SSR issues
const CaravanMap = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <AkiraBackground />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="font-mono text-sm text-white">LOADING_MAP_INTERFACE...</p>
        </div>
      </div>
    </div>
  )
})

export default CaravanMap