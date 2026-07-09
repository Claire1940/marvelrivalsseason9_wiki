import type { LucideIcon } from 'lucide-react'
import {
	CalendarClock,
	Users,
	Eye,
	ScrollText,
	Swords,
	Trophy,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

// 导航配置：Marvel Rivals Season 9 的 6 个内容分类
export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'release', path: '/release', icon: CalendarClock, isContentType: true },
	{ key: 'characters', path: '/characters', icon: Users, isContentType: true },
	{ key: 'leaks', path: '/leaks', icon: Eye, isContentType: true },
	{ key: 'patch', path: '/patch', icon: ScrollText, isContentType: true },
	{ key: 'teamups', path: '/teamups', icon: Swords, isContentType: true },
	{ key: 'battlepass', path: '/battlepass', icon: Trophy, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}

