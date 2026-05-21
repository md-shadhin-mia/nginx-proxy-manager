import { getIcon } from 'cybercore-css/icons';
import type { IconVariant, IconColor } from 'cybercore-css/icons';
import { useEffect, useState } from 'react';

interface CyberIconProps {
	name: string;
	size?: number;
	color?: IconColor;
	variant?: IconVariant;
	className?: string;
	onClick?: () => void;
}

export function CyberIcon({
	name,
	size = 24,
	color = 'current',
	variant = 'outline',
	className = '',
	onClick,
}: CyberIconProps) {
	const [svgContent, setSvgContent] = useState<string>('');

	useEffect(() => {
		const svg = getIcon(name, variant);
		if (svg) {
			const colorMap: Record<IconColor, string> = {
				cyan: 'var(--cyber-cyan-500, #00f0ff)',
				magenta: 'var(--cyber-magenta-500, #ff2a6d)',
				yellow: 'var(--cyber-yellow-500, #fcee0a)',
				green: 'var(--cyber-green-500, #05ffa1)',
				current: 'currentColor',
			};
			const colorValue = colorMap[color] || 'currentColor';
			const styledSvg = svg
				.replace('<svg', `<svg width="${size}" height="${size}" style="color: ${colorValue}"`)
				.replace('width="24"', '')
				.replace('height="24"', '');
			setSvgContent(styledSvg);
		}
	}, [name, variant, size, color]);

	if (!svgContent) {
		return null;
	}

	return (
		<span
			className={`cyber-icon cyber-icon--${name} ${className}`}
			style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}
			dangerouslySetInnerHTML={{ __html: svgContent }}
			onClick={onClick}
		/>
	);
}
