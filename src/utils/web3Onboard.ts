import { init } from '@web3-onboard/react'
import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
import gnosisModule from '@web3-onboard/gnosis'
import walletConnectModule from '@web3-onboard/walletconnect'
import trustModule from '@web3-onboard/trust'

const wcV2InitOptions = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT ?? '',
  requiredChains: [137, 43114],
  dappUrl: 'https://app.kassandra.finance',
  version: 2 as const
}

const injected = injectedModule({
  displayUnavailable: true,
  sort: wallets => {
    const metaMask = wallets.find(
      ({ label }) => label === ProviderLabel.MetaMask
    )
    const coinbase = wallets.find(
      ({ label }) => label === ProviderLabel.Coinbase
    )

    return (
      [
        metaMask,
        coinbase,
        ...wallets.filter(
          ({ label }) =>
            label !== ProviderLabel.MetaMask && label !== ProviderLabel.Coinbase
        )
      ]
        // remove undefined values
        .flatMap(wallet => (wallet ? wallet : []))
    )
  }
})
const walletConnect = walletConnectModule(wcV2InitOptions)
const gnosis = gnosisModule()
const trust = trustModule()

const wallets = [walletConnect, gnosis, trust, injected]

const chains = [
  {
    id: '0xa86a',
    token: 'AVAX',
    label: 'Avalanche',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://snowtrace.io',
    color: '#E84142',
    icon: `<svg width="1503" height="1504" viewBox="0 0 1503 1504" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="287" y="258" width="928" height="844" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z" fill="#E84142"/>
</svg>`,
    secondaryTokens: [
      {
        address: '0xf32398dae246C5f672B52A54e9B413dFFcAe1A44',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/17587.png'
      }
    ]
  },
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Polygon - POS',
    rpcUrl: 'https://rpc.ankr.com/polygon',
    blockExplorerUrl: 'https://polygonscan.com',
    color: '#7b3fe4',
    icon: `<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">
	<defs>
		<style>
			.cls-1 {
				fill: #fff;
			}

			.cls-2 {
				clip-path: url(#clippath);
			}

			.cls-3 {
				fill: none;
			}

			.cls-4 {
				fill: url(#linear-gradient);
			}
		</style>
		<clipPath id="clippath">
			<circle class="cls-3" cx="250" cy="250" r="244.91" />
		</clipPath>
		<linearGradient id="linear-gradient" x1="-116.09" y1="25.97" x2="437.45" y2="364.71" gradientUnits="userSpaceOnUse">
			<stop offset="0" stop-color="#a229c5" />
			<stop offset="1" stop-color="#7b3fe4" />
		</linearGradient>
	</defs>
	<g class="cls-2">
		<rect class="cls-4" x="-18.1" y="-18.1" width="536.2" height="536.2" />
	</g>
	<path class="cls-1"
		d="m320.83,302.85l69.29-40.01c3.67-2.12,5.94-6.06,5.94-10.3v-80.01c0-4.23-2.28-8.18-5.94-10.3l-69.29-40.01c-3.67-2.12-8.22-2.11-11.89,0l-69.29,40.01c-3.67,2.12-5.94,6.07-5.94,10.3v142.99l-48.59,28.05-48.59-28.05v-56.11l48.59-28.05,32.05,18.5v-37.64l-26.11-15.07c-1.8-1.04-3.86-1.59-5.95-1.59s-4.15.55-5.94,1.59l-69.29,40.01c-3.67,2.12-5.94,6.06-5.94,10.3v80.01c0,4.23,2.28,8.18,5.94,10.3l69.29,40.01c3.66,2.11,8.22,2.11,11.89,0l69.29-40c3.67-2.12,5.94-6.07,5.94-10.3v-142.99l.88-.5,47.71-27.55,48.59,28.05v56.11l-48.59,28.05-32-18.48v37.64l26.06,15.05c3.67,2.11,8.22,2.11,11.89,0Z" />
</svg>`,
    secondaryTokens: [
      {
        address: '0x366e293a5cf90a0458d9ff9f3f92234da598f62e',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/17587.png'
      }
    ]
  },
  {
    id: '0xa4b1',
    token: 'WETH',
    label: 'Arbitrum',
    rpcUrl: 'https://arbitrum-one.publicnode.com',
    blockExplorerUrl: 'https://arbiscan.io/',
    color: '#96BEDC',
    icon: `<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4224 10.9962L15.1893 8.00571L19.9515 15.4049L19.9537 16.8244L19.9381 7.05324C19.9326 6.93538 19.8987 6.82058 19.8393 6.71854C19.7799 6.61649 19.6968 6.5302 19.5969 6.46694L11.0232 1.54757C10.9207 1.49902 10.8087 1.47408 10.6952 1.47462C10.5818 1.47515 10.47 1.50114 10.368 1.55065C10.3416 1.56388 10.3159 1.57867 10.2912 1.59495L10.2614 1.61376L1.93897 6.42453L1.90656 6.43906C1.86343 6.45899 1.82227 6.48293 1.78363 6.51056C1.62755 6.62174 1.52118 6.78935 1.48719 6.97764C1.48199 7.00621 1.47844 7.03504 1.47656 7.06401L1.48959 15.0265L5.92539 8.16819C6.48381 7.25882 7.70059 6.96584 8.83012 6.98175L10.1558 7.01595L2.34445 19.5122L3.26532 20.041L11.1703 7.02844L14.6643 7.01578L6.77973 20.3562L10.0658 22.2427L10.4584 22.4679C10.6278 22.5351 10.8158 22.5388 10.9877 22.4784L19.682 17.4523L18.0189 18.4131L13.4224 10.9962ZM14.0966 20.6812L10.778 15.4854L12.8037 12.0564L17.162 18.909L14.0966 20.6812Z" fill="#2D374B"/>
<path d="M10.7812 15.4856L14.0999 20.6812L17.1654 18.909L12.8073 12.0566L10.7812 15.4856Z" fill="#28A0F0"/>
<path d="M19.962 16.8246L19.9598 15.405L15.1975 8.00586L13.4297 10.996L18.027 18.4129L19.6901 17.4521C19.7706 17.387 19.8364 17.3057 19.8833 17.2134C19.9302 17.1212 19.9571 17.0202 19.9622 16.9169L19.962 16.8246Z" fill="#28A0F0"/>
<path d="M0 18.1642L2.34734 19.5135L10.1587 7.01724L8.83301 6.98303C7.70349 6.96713 6.4867 7.25993 5.92828 8.16947L1.49249 15.0278L0.000858095 17.315V18.1649L0 18.1642Z" fill="white"/>
<path d="M14.6644 7.0166L11.1706 7.02926L3.26562 20.0418L6.02856 21.6288L6.77987 20.3576L14.6644 7.0166Z" fill="white"/>
<path d="M21.4292 6.99858C21.4132 6.6389 21.3098 6.28849 21.1278 5.97757C20.9458 5.66665 20.6907 5.40455 20.3846 5.21387L11.6985 0.231045C11.3884 0.0790407 11.0475 0 10.702 0C10.3565 0 10.0156 0.0790407 9.70553 0.231045C9.633 0.267475 1.25845 5.11262 1.25845 5.11262C1.1421 5.16835 1.03081 5.23404 0.925837 5.30896C0.653911 5.50186 0.429338 5.75372 0.268984 6.04562C0.10863 6.33752 0.0166664 6.66187 0 6.99431V17.314L1.49163 15.0268L1.48014 7.0646C1.48712 6.95544 1.51828 6.84918 1.57138 6.75348C1.62448 6.65777 1.69819 6.57501 1.78721 6.51114C1.82664 6.48292 10.3442 1.56475 10.3713 1.55124C10.4732 1.50172 10.5851 1.47574 10.6985 1.47521C10.8119 1.47467 10.924 1.49961 11.0264 1.54816L19.6002 6.46787C19.7 6.53113 19.7831 6.61742 19.8425 6.71946C19.9019 6.82151 19.9358 6.93631 19.9414 7.05417V16.9179C19.9393 17.0201 19.9154 17.1208 19.8711 17.2131C19.8269 17.3054 19.7635 17.3872 19.685 17.453L18.022 18.4139L17.1647 18.9099L14.0991 20.6821L10.9902 22.4795C10.8183 22.54 10.6303 22.5363 10.4609 22.469L6.78279 20.3587L6.03149 21.6298L9.33708 23.5282C9.44646 23.5902 9.54385 23.6452 9.62374 23.69C9.74753 23.7584 9.83189 23.8055 9.86155 23.8199C10.1381 23.9407 10.4371 24.0021 10.739 23.9999C11.0159 24.0003 11.2905 23.9488 11.5483 23.8481L20.5781 18.6316C20.8329 18.4339 21.0411 18.1829 21.1881 17.8963C21.3351 17.6097 21.4173 17.2944 21.4289 16.9726L21.4292 6.99858Z" fill="#96BEDC"/>
</svg>`
  }
  // {
  //   id: '0x5',
  //   token: 'ETH',
  //   label: 'Goerli Test Network',
  //   rpcUrl: 'https://rpc.ankr.com/eth_goerli'
  // }
]

const appMetadata = {
  name: 'Kassandra',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 698 698"><g filter="url(#a)" transform="translate(-.33878002 36.076565)"><path stroke="url(#b)" stroke-miterlimit="10" stroke-width="12.0061" d="M667.839 349.53c0 94.873-41.54 180.031-107.278 238.326L407.742 453.929h148.436c12.005 0 21.913-9.716 21.913-21.909 0-12.002-9.718-21.908-21.913-21.908H142.5c-12.005 0-21.913 9.716-21.913 21.908 0 12.002 9.718 21.909 21.913 21.909h166.729L144.215 593C74.8553 534.514 30.8389 447.071 30.8389 349.34 30.8389 173.5 173.368 31 349.243 31c175.876.1905 318.596 142.691 318.596 318.53z"/></g><path stroke="url(#c)" stroke-miterlimit="10" stroke-width="9.60486" d="M667.50019 385.60654c0 94.873-41.54 180.031-107.27799 238.32599l-152.819-133.92699h148.436c12.005 0 21.913-9.716 21.913-21.909 0-12.002-9.718-21.908-21.913-21.908H142.16121c-12.005 0-21.91299 9.716-21.91299 21.908 0 12.002 9.71799 21.909 21.91299 21.909h166.729l-165.014 139.07099C74.516516 570.59054 30.500118 483.14754 30.500118 385.41654c0-175.83999 142.529092-318.339977 318.404092-318.339977 175.87599.1905 318.59598 142.690987 318.59598 318.529977z"/><defs id="defs555"><linearGradient id="b" x1="349.837" x2="349.837" y1="-229.573" y2="789.8" gradientUnits="userSpaceOnUse"><stop id="stop545" stop-color="#FFBF00"/><stop id="stop547" offset="1" stop-color="#E843C4"/></linearGradient><linearGradient id="c" x1="349.339" x2="349.339" y1="31" y2="593" gradientTransform="translate(-.33878002 36.076565)" gradientUnits="userSpaceOnUse"><stop id="stop550" stop-color="#FFBF00"/><stop id="stop552" offset="1" stop-color="#E843C4"/></linearGradient><filter id="a" width="697.03" height="623.879" x=".82378" y=".983936" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood id="feFlood538" flood-opacity="0" result="BackgroundImageFix"/><feBlend id="feBlend540" in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape"/><feGaussianBlur id="feGaussianBlur542" result="effect1_foregroundBlur" stdDeviation="12.0061"/></filter></defs></svg>',
  logo: `<svg width="216" height="34" viewBox="0 0 216 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_4442_53300)">
<path d="M32 18.4858C32 22.2422 30.3045 25.6139 27.6213 27.922L21.3838 22.6193H27.4424C27.9324 22.6193 28.3368 22.2347 28.3368 21.7519C28.3368 21.2767 27.9402 20.8845 27.4424 20.8845H10.5576C10.0676 20.8845 9.66318 21.2692 9.66318 21.7519C9.66318 22.2271 10.0598 22.6193 10.5576 22.6193H17.3628L10.6276 28.1257C7.79659 25.81 6 22.3478 6 18.4783C6 11.5161 11.8175 5.87402 18.9961 5.87402C26.1747 5.88157 32 11.5237 32 18.4858Z" stroke="url(#paint0_linear_4442_53300)" stroke-width="0.666667" stroke-miterlimit="10"/>
</g>
<path d="M32 18.4829C32 22.2385 30.3045 25.6094 27.6213 27.917L21.3838 22.6155H27.4424C27.9324 22.6155 28.3368 22.2309 28.3368 21.7483C28.3368 21.2732 27.9402 20.8811 27.4424 20.8811H10.5576C10.0676 20.8811 9.66318 21.2657 9.66318 21.7483C9.66318 22.2234 10.0598 22.6155 10.5576 22.6155H17.3628L10.6276 28.1206C7.79659 25.8055 6 22.344 6 18.4754C6 11.5149 11.8175 5.87402 18.9961 5.87402C26.1747 5.88156 32 11.5224 32 18.4829Z" stroke="url(#paint1_linear_4442_53300)" stroke-width="0.666667" stroke-miterlimit="10"/>
<path d="M60.7061 12.4667H57.4034L49.0778 19.7444V9H46.9219V25.0707H49.0778V22.6371L53.9401 18.3899L59.7428 25.0707H62.5868L55.5685 16.9435L60.7061 12.4667Z" fill="url(#paint2_linear_4442_53300)"/>
<path d="M75.2149 12.4667H63.7472V14.6247H75.2149C76.5222 14.6247 77.5772 15.7038 77.5772 17.0124V17.6782H67.4168C65.3756 17.6782 63.7472 19.3311 63.7472 21.3744C63.7472 23.4177 65.3756 25.0707 67.4168 25.0707H79.7561V17.0124C79.7561 14.5099 77.7378 12.4667 75.2149 12.4667ZM77.5772 22.8897H67.4168C66.5682 22.8897 65.9031 22.2239 65.9031 21.3744C65.9031 20.5479 66.5682 19.8592 67.4168 19.8592H77.5772V22.8897Z" fill="url(#paint3_linear_4442_53300)"/>
<path d="M95.5323 17.6782H86.8627C86.037 17.6782 85.3719 16.9894 85.3719 16.14C85.3719 15.3135 86.037 14.6247 86.8627 14.6247H99.202V12.4667H86.8627C84.8444 12.4667 83.193 14.0967 83.193 16.14C83.193 18.2062 84.8444 19.8592 86.8627 19.8592H95.5323C96.3809 19.8592 97.046 20.5479 97.046 21.3744C97.046 22.2239 96.3809 22.8897 95.5323 22.8897H83.193V25.0707H95.5323C97.5735 25.0707 99.202 23.4177 99.202 21.3744C99.202 19.3311 97.5735 17.6782 95.5323 17.6782Z" fill="url(#paint4_linear_4442_53300)"/>
<path d="M114.978 17.6782H106.309C105.483 17.6782 104.818 16.9894 104.818 16.14C104.818 15.3135 105.483 14.6247 106.309 14.6247H118.648V12.4667H106.309C104.29 12.4667 102.639 14.0967 102.639 16.14C102.639 18.2062 104.29 19.8592 106.309 19.8592H114.978C115.827 19.8592 116.492 20.5479 116.492 21.3744C116.492 22.2239 115.827 22.8897 114.978 22.8897H102.639V25.0707H114.978C117.019 25.0707 118.648 23.4177 118.648 21.3744C118.648 19.3311 117.019 17.6782 114.978 17.6782Z" fill="url(#paint5_linear_4442_53300)"/>
<path d="M133.552 12.4667H122.085V14.6247H133.552C134.86 14.6247 135.915 15.7038 135.915 17.0124V17.6782H125.754C123.713 17.6782 122.085 19.3311 122.085 21.3744C122.085 23.4177 123.713 25.0707 125.754 25.0707H138.094V17.0124C138.094 14.5099 136.075 12.4667 133.552 12.4667ZM135.915 22.8897H125.754C124.906 22.8897 124.241 22.2239 124.241 21.3744C124.241 20.5479 124.906 19.8592 125.754 19.8592H135.915V22.8897Z" fill="url(#paint6_linear_4442_53300)"/>
<path d="M153.021 12.4667H141.531V25.0707H143.687V14.6247H153.021C154.306 14.6247 155.384 15.7038 155.384 17.0124V25.0707H157.54V17.0124C157.54 14.5099 155.498 12.4667 153.021 12.4667Z" fill="url(#paint7_linear_4442_53300)"/>
<path d="M174.829 12.4667H165.518C163.018 12.4667 160.976 14.5099 160.976 17.0124V20.502C160.976 23.0274 163.018 25.0707 165.518 25.0707H177.008V9H174.829V12.4667ZM174.829 22.8897H165.518C164.21 22.8897 163.132 21.8106 163.132 20.502V17.0124C163.132 15.7038 164.21 14.6247 165.518 14.6247H174.829V22.8897Z" fill="url(#paint8_linear_4442_53300)"/>
<path d="M180.445 17.0124V25.0707H182.601V17.0124C182.601 15.7038 183.656 14.6247 184.986 14.6247H196.477V12.4667H184.986C182.463 12.4667 180.445 14.5099 180.445 17.0124Z" fill="url(#paint9_linear_4442_53300)"/>
<path d="M211.381 12.4667H199.913V14.6247H211.381C212.688 14.6247 213.743 15.7038 213.743 17.0124V17.6782H203.583C201.541 17.6782 199.913 19.3311 199.913 21.3744C199.913 23.4177 201.541 25.0707 203.583 25.0707H215.922V17.0124C215.922 14.5099 213.904 12.4667 211.381 12.4667ZM213.743 22.8897H203.583C202.734 22.8897 202.069 22.2239 202.069 21.3744C202.069 20.5479 202.734 19.8592 203.583 19.8592H213.743V22.8897Z" fill="url(#paint10_linear_4442_53300)"/>
<defs>
<filter id="filter0_f_4442_53300" x="0.333659" y="0.207682" width="37.3327" height="33.6823" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2.66667" result="effect1_foregroundBlur_4442_53300"/>
</filter>
<linearGradient id="paint0_linear_4442_53300" x1="19.0203" y1="-4.44302" x2="19.0203" y2="35.9177" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFBF00"/>
<stop offset="1" stop-color="#E843C4"/>
</linearGradient>
<linearGradient id="paint1_linear_4442_53300" x1="19" y1="5.87402" x2="19" y2="28.1206" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFBF00"/>
<stop offset="1" stop-color="#E843C4"/>
</linearGradient>
<linearGradient id="paint2_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
<linearGradient id="paint3_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
<linearGradient id="paint4_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
<linearGradient id="paint5_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
<linearGradient id="paint6_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
<linearGradient id="paint7_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
<linearGradient id="paint8_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
<linearGradient id="paint9_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
<linearGradient id="paint10_linear_4442_53300" x1="136.752" y1="7.85209" x2="136.752" y2="30.8102" gradientUnits="userSpaceOnUse">
<stop stop-color="#E843C4"/>
<stop offset="1" stop-color="#FFBF00"/>
</linearGradient>
</defs>
</svg>`,
  description: 'Example showcasing how to connect a wallet.',
  gettingStartedGuide: 'https://www.kassandra.finance/managers',
  explore: 'https://www.kassandra.finance/',
  recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }]
  // agreement: {
  //   // user agrees with exact version of terms and privacy policy
  //   version: '0.0',
  //   // url that points to the Terms & Conditions of the dapp
  //   termsUrl: 'https://www.kassandra.finance/',
  //   // url that points to the Privacy policy of the dapp
  //   privacyUrl: 'https://www.kassandra.finance/'
  // }
}

const web3Onboard = init({
  theme: {
    '--w3o-background-color':
      'linear-gradient(164.99deg, #1b1d22 19.85%, #333437 116.33%)',
    '--w3o-foreground-color': '#1B1D22',
    '--w3o-text-color': '#fcfcfc',
    '--w3o-border-color': 'rgba(255, 255, 255, 0.05)',
    '--w3o-action-color': 'unset',
    '--w3o-border-radius': '8px',
    '--w3o-font-family': 'Rubik'
  },
  disableFontDownload: true,
  wallets,
  chains,
  appMetadata,
  accountCenter: {
    desktop: {
      enabled: false
    },
    mobile: {
      enabled: false
    }
  }
})

export default web3Onboard
