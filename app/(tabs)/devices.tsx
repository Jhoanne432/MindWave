import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

export default function ModelViewer() {
  // Create HTML content to be injected into WebView
  const generateHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MindWatch Pro - Connect Device</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #ec4899;
            --tertiary: #8b5cf6;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --dark: #1e293b;
            --light: #f8fafc;
        }
        
        body {
            font-family: 'Outfit', sans-serif;
            touch-action: manipulation;
            overscroll-behavior: none;
            background-color: #000;
            color: var(--light);
            margin: 0;
            padding: 0;
        }
        
        .app-container {
            max-width: 430px;
            height: 100vh;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
        }
        
        .bg-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
            z-index: 0;
            pointer-events: none;
        }
        
        .bg-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: 40px 40px;
            background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            z-index: 0;
            pointer-events: none;
        }
        
        .content {
            position: relative;
            z-index: 1;
            padding: 24px;
            height: 100%;
            overflow-y: auto;
        }
        
        .header {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            padding-top: 12px;
        }
        
        .back-button {
            margin-right: 16px;
        }
        
        .title {
            font-size: 24px;
            font-weight: 700;
            background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .card {
            background: rgba(30, 41, 59, 0.5);
            border-radius: 24px;
            padding: 24px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
        }
        
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, var(--primary) 0%, var(--tertiary) 100%);
        }
        
        .btn {
            border-radius: 16px;
            padding: 14px 20px;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .btn::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
            z-index: 0;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.4);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .btn:active {
            transform: scale(0.98);
        }
        
        .btn-icon {
            margin-right: 8px;
            position: relative;
            z-index: 1;
        }
        
        .btn-text {
            position: relative;
            z-index: 1;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(79, 70, 229, 0.5);
        }
        
        .device-list {
            margin-top: 16px;
        }
        
        .device-item {
            background: rgba(30, 41, 59, 0.7);
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .device-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            border-color: rgba(99, 102, 241, 0.3);
        }
        
        .device-info {
            display: flex;
            align-items: center;
        }
        
        .device-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
        }
        
        .device-name {
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .device-status {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .device-action {
            display: flex;
            align-items: center;
        }
        
        .device-battery {
            display: flex;
            align-items: center;
            margin-right: 16px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .battery-icon {
            margin-right: 4px;
        }
        
        .connect-btn {
            background: rgba(16, 185, 129, 0.2);
            color: var(--success);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 12px;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .connect-btn:hover {
            background: rgba(16, 185, 129, 0.3);
        }
        
        .connected-badge {
            background: rgba(16, 185, 129, 0.2);
            color: var(--success);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 12px;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
        }
        
        .connected-icon {
            margin-right: 4px;
        }
        
        .smartwatch-visual {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 30px 0;
            position: relative;
        }
        
        .watch-body {
            width: 160px;
            height: 190px;
            background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
            border-radius: 40px;
            position: relative;
            box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
            border: 4px solid #4a5568;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .watch-screen {
            width: 130px;
            height: 160px;
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            border-radius: 30px;
            overflow: hidden;
            position: relative;
            border: 2px solid #2d3748;
        }
        
        .watch-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px;
        }
        
        .watch-button {
            position: absolute;
            width: 8px;
            height: 20px;
            background: #4a5568;
            border-radius: 4px;
            right: -12px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .watch-button::before {
            content: '';
            position: absolute;
            width: 8px;
            height: 30px;
            background: #4a5568;
            border-radius: 4px;
            right: 0;
            top: 40px;
        }
        
        .watch-strap-top {
            width: 80px;
            height: 80px;
            background: linear-gradient(to bottom, #4a5568 0%, #2d3748 100%);
            border-radius: 20px;
            position: absolute;
            top: -60px;
            box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
        }
        
        .watch-strap-bottom {
            width: 80px;
            height: 80px;
            background: linear-gradient(to top, #4a5568 0%, #2d3748 100%);
            border-radius: 20px;
            position: absolute;
            bottom: -60px;
            box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
        }
        
        .watch-time {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .watch-date {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 16px;
        }
        
        .watch-icon {
            margin-bottom: 8px;
        }
        
        .watch-status {
            font-size: 12px;
            color: var(--primary);
            font-weight: 500;
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
            }
        }
        
        .scanning-animation {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 3px solid rgba(99, 102, 241, 0.3);
            border-top-color: var(--primary);
            animation: spin 1.5s linear infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        
        .connection-waves {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
        }
        
        .wave {
            position: absolute;
            border: 2px solid rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: wave-animation 3s infinite;
            opacity: 0;
        }
        
        .wave-1 {
            width: 100px;
            height: 100px;
            animation-delay: 0s;
        }
        
        .wave-2 {
            width: 140px;
            height: 140px;
            animation-delay: 1s;
        }
        
        .wave-3 {
            width: 180px;
            height: 180px;
            animation-delay: 2s;
        }
        
        @keyframes wave-animation {
            0% {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 0;
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: rgba(99, 102, 241, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            padding: 16px;
            border-radius: 16px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            z-index: 100;
            width: 85%;
            max-width: 400px;
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .notification.show {
            transform: translateX(-50%) translateY(0);
        }
        
        .error-notification {
            background: rgba(239, 68, 68, 0.9);
        }
        
        .success-notification {
            background: rgba(16, 185, 129, 0.9);
        }
        
        .fade-in {
            animation: fadeIn 0.5s forwards;
            opacity: 0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .slide-in {
            animation: slideIn 0.5s forwards;
        }
        
        @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .floating-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }
        
        .shape {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            animation: float 20s infinite linear;
        }
        
        .shape-1 {
            width: 150px;
            height: 150px;
            top: -50px;
            right: -50px;
            animation-duration: 35s;
        }
        
        .shape-2 {
            width: 100px;
            height: 100px;
            bottom: 10%;
            left: -30px;
            animation-duration: 45s;
            animation-delay: -10s;
        }
        
        .shape-3 {
            width: 80px;
            height: 80px;
            top: 30%;
            right: -20px;
            animation-duration: 40s;
            animation-delay: -5s;
        }
        
        .shape-4 {
            width: 60px;
            height: 60px;
            bottom: 20%;
            right: 10%;
            animation-duration: 30s;
            animation-delay: -15s;
        }
        
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(-10px, 20px) rotate(90deg);
            }
            50% {
                transform: translate(10px, 40px) rotate(180deg);
            }
            75% {
                transform: translate(20px, 20px) rotate(270deg);
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
            }
        }
        
        .tab-container {
            display: flex;
            background: rgba(30, 41, 59, 0.7);
            border-radius: 16px;
            padding: 4px;
            margin-bottom: 24px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .tab {
            flex: 1;
            padding: 12px;
            text-align: center;
            font-weight: 500;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .tab.active {
            background: rgba(99, 102, 241, 0.2);
            color: var(--primary);
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
            animation: fadeIn 0.5s forwards;
        }
        
        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 0;
            text-align: center;
        }
        
        .empty-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
        }
        
        .empty-title {
            font-weight: 600;
            font-size: 18px;
            margin-bottom: 8px;
        }
        
        .empty-description {
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 24px;
            max-width: 280px;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <!-- Background Elements -->
        <div class="bg-pattern"></div>
        <div class="bg-grid"></div>
        <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <div class="header">
                <button class="back-button">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <h1 class="title">Connect Device</h1>
            </div>
            
            <!-- Smartwatch Visual -->
            <div class="smartwatch-visual">
                <div class="connection-waves">
                    <div class="wave wave-1"></div>
                    <div class="wave wave-2"></div>
                    <div class="wave wave-3"></div>
                </div>
                <div class="watch-strap-top"></div>
                <div class="watch-body">
                    <div class="watch-button"></div>
                    <div class="watch-screen">
                        <div class="watch-content">
                            <div class="watch-time">10:42</div>
                            <div class="watch-date">Wed, 15 Jun</div>
                            <div class="watch-icon">
                                <svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path>
                                </svg>
                            </div>
                            <div class="watch-status">Searching...</div>
                        </div>
                    </div>
                </div>
                <div class="watch-strap-bottom"></div>
            </div>
            
            <!-- Tabs -->
            <div class="tab-container">
                <div class="tab active" data-tab="available">Available</div>
                <div class="tab" data-tab="paired">Paired</div>
                <div class="tab" data-tab="help">Help</div>
            </div>
            
            <!-- Available Devices Tab -->
            <div class="tab-content active" id="available-tab">
                <div class="card fade-in">
                    <h2 class="text-lg font-semibold mb-2">Available Devices</h2>
                    <p class="text-gray-400 text-sm mb-4">Select a device to connect to MindWatch Pro</p>
                    
                    <div class="device-list">
                        <div class="device-item slide-in" style="animation-delay: 0.1s">
                            <div class="device-info">
                                <div class="device-icon">
                                    <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"></path>
                                        <circle cx="9" cy="9" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <div class="device-name">MindWatch Pro S2</div>
                                    <div class="device-status">Available</div>
                                </div>
                            </div>
                            <div class="device-action">
                                <button class="connect-btn">Connect</button>
                            </div>
                        </div>
                        
                        <div class="device-item slide-in" style="animation-delay: 0.2s">
                            <div class="device-info">
                                <div class="device-icon">
                                    <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"></path>
                                        <circle cx="9" cy="9" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <div class="device-name">MindWatch Lite</div>
                                    <div class="device-status">Available</div>
                                </div>
                            </div>
                            <div class="device-action">
                                <button class="connect-btn">Connect</button>
                            </div>
                        </div>
                        
                        <div class="device-item slide-in" style="animation-delay: 0.3s">
                            <div class="device-info">
                                <div class="device-icon">
                                    <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"></path>
                                        <circle cx="9" cy="9" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <div class="device-name">MindBand Flex</div>
                                    <div class="device-status">Available</div>
                                </div>
                            </div>
                            <div class="device-action">
                                <button class="connect-btn">Connect</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="btn btn-secondary w-full mb-4">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <span>Refresh Device List</span>
                </button>
            </div>
            
            <!-- Paired Devices Tab -->
            <div class="tab-content" id="paired-tab">
                <div class="card">
                    <h2 class="text-lg font-semibold mb-2">Paired Devices</h2>
                    <p class="text-gray-400 text-sm mb-4">Manage your connected devices</p>
                    
                    <div class="device-list">
                        <div class="device-item">
                            <div class="device-info">
                                <div class="device-icon pulse-animation">
                                    <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v18m0 0l-5.5-5.5M9 21l5.5-5.5"></path>
                                        <circle cx="9" cy="9" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <div class="device-name">MindWatch Pro S2</div>
                                    <div class="device-status">Connected</div>
                                </div>
                            </div>
                            <div class="device-action">
                                <div class="device-battery">
                                    <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z"></path>
                                        <path d="M17 7H3v6h14V7z"></path>
                                    </svg>
                                    85%
                                </div>
                                <div class="connected-badge">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Connected
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <h2 class="text-lg font-semibold mb-2">Device Settings</h2>
                    
                    <div class="mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <div class="text-sm font-medium">Auto-connect on startup</div>
                            <div class="relative inline-block w-10 mr-2 align-middle select-none">
                                <input type="checkbox" name="auto-connect" id="auto-connect" checked class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                <label for="auto-connect" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                            </div>
                        </div>
                        <div class="text-xs text-gray-400">Automatically connect to paired devices when app starts</div>
                    </div>
                    
                    <div class="mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <div class="text-sm font-medium">Background sync</div>
                            <div class="relative inline-block w-10 mr-2 align-middle select-none">
                                <input type="checkbox" name="bg-sync" id="bg-sync" checked class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                <label for="bg-sync" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                            </div>
                        </div>
                        <div class="text-xs text-gray-400">Keep syncing data when app is in background</div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <div class="text-sm font-medium">Notifications</div>
                            <div class="relative inline-block w-10 mr-2 align-middle select-none">
                                <input type="checkbox" name="notifications" id="notifications" checked class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                <label for="notifications" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                            </div>
                        </div>
                        <div class="text-xs text-gray-400">Receive notifications from your device</div>
                    </div>
                </div>
                
                <button class="btn btn-secondary w-full mb-4 mt-4">
                    <svg class="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <span class="text-red-400">Unpair Device</span>
                </button>
            </div>
            
            <!-- Help Tab -->
            <div class="tab-content" id="help-tab">
                <div class="card">
                    <h2 class="text-lg font-semibold mb-4">Connection Help</h2>
                    
                    <div class="mb-6">
                        <h3 class="text-md font-medium mb-2">Can't find your device?</h3>
                        <ul class="text-sm text-gray-300 space-y-2">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Make sure your device is charged and powered on</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Enable Bluetooth on your phone and make sure it's discoverable</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Put your device in pairing mode (check device manual)</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Keep your device within 30 feet (10 meters) of your phone</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-md font-medium mb-2">Connection Issues?</h3>
                        <ul class="text-sm text-gray-300 space-y-2">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Restart your device and try connecting again</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Forget the device in your phone's Bluetooth settings and try again</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Update your device firmware to the latest version</span>
                            </li>
                        </ul>
                    </div>
                    
                    <button class="btn btn-primary w-full">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Contact Support</span>
                    </button>
                </div>
                
                <div class="card mt-4">
                    <h2 class="text-lg font-semibold mb-2">Compatible Devices</h2>
                    <p class="text-sm text-gray-400 mb-4">MindWatch Pro works with the following devices:</p>
                    
                    <ul class="text-sm text-gray-300 space-y-3">
                        <li class="flex items-center">
                            <div class="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <span>MindWatch Pro Series (S1, S2, S3)</span>
                        </li>
                        <li class="flex items-center">
                            <div class="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <span>MindWatch Lite</span>
                        </li>
                        <li class="flex items-center">
                            <div class="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <span>MindBand Series (Flex, Pro, Ultra)</span>
                        </li>
                        <li class="flex items-center">
                            <div class="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center mr-3">
                                <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <span>MindSense Headband</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Notification -->
        <div id="notification" class="notification">
            <div class="flex items-center">
                <div class="mr-3 flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div id="notification-content">
                    <div class="font-medium" id="notification-title">Notification</div>
                    <div class="text-sm" id="notification-message">This is a notification message.</div>
                </div>
            </div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Tab switching
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to current tab and content
                this.classList.add('active');
                document.getElementById(tabId + '-tab').classList.add('active');
            });
        });
            
            // Connect buttons
            const connectButtons = document.querySelectorAll('.connect-btn');
            connectButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const deviceItem = this.closest('.device-item');
                    const deviceName = deviceItem.querySelector('.device-name').textContent;
                    
                    // Show connecting state
                    this.textContent = 'Connecting...';
                    this.disabled = true;
                    
                    
                });
            });
            
            // Refresh button
            const refreshButton = document.querySelector('.btn-secondary');
            refreshButton.addEventListener('click', function() {
                showNotification('Scanning', 'Searching for nearby devices...', 'info');
                
                // Simulate refresh
                setTimeout(() => {
                    showNotification('Scan Complete', '3 devices found', 'success');
                }, 2000);
            });
            
            // Toggle switches styling
            document.querySelectorAll('.toggle-checkbox').forEach(toggle => {
                toggle.addEventListener('change', function() {
                    const label = this.nextElementSibling;
                    if (this.checked) {
                        label.style.backgroundColor = '#6366f1';
                    } else {
                        label.style.backgroundColor = '#374151';
                    }
                });
                
                // Set initial state
                const label = toggle.nextElementSibling;
                if (toggle.checked) {
                    label.style.backgroundColor = '#6366f1';
                } else {
                    label.style.backgroundColor = '#374151';
                }
            });
            
            // Notification function
            function showNotification(title, message, type = 'info') {
                const notification = document.getElementById('notification');
                const notificationTitle = document.getElementById('notification-title');
                const notificationMessage = document.getElementById('notification-message');
                
                // Set content
                notificationTitle.textContent = title;
                notificationMessage.textContent = message;
                
                // Set type
                notification.className = 'notification';
                if (type === 'error') {
                    notification.classList.add('error-notification');
                } else if (type === 'success') {
                    notification.classList.add('success-notification');
                }
                
                // Show notification
                notification.classList.add('show');
                
                // Hide after 4 seconds
                setTimeout(function() {
                    notification.classList.remove('show');
                }, 4000);
            }
            
            // Create dynamic particles for the watch animation
            const watchContent = document.querySelector('.watch-content');
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '2px';
                particle.style.height = '2px';
                particle.style.backgroundColor = 'rgba(99, 102, 241, 0.6)';
                particle.style.borderRadius = '50%';
                
                
                const options = { weekday: 'short', day: 'numeric', month: 'short' };
                const date = now.toLocaleDateString('en-US', options);
                
                document.querySelector('.watch-time').textContent = time;
                document.querySelector('.watch-date').textContent = date;
            }
            
            updateWatchTime();
            setInterval(updateWatchTime, 60000); // Update every minute
        });
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'95d87a652628fec7',t:'MTc1MjIzODc2Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>

 `;
  };

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={{ html: generateHTML() }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});