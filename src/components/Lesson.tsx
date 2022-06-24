import { CheckCircle, Lock } from "phosphor-react"
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from "react-router-dom";
import classNames from 'classnames';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class'
}
export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>()

    const isLessonAvailableAt = isPast(props.availableAt);
    const availableDateFormated = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
    })

    const isActiveLesson = slug === props.slug

    return (
        <Link to={isLessonAvailableAt ? `/event/lesson/${props.slug}` : ''}  className={classNames("group", {
            'cursor-text': !isLessonAvailableAt
        })}>
            <span className="text-gray-300">
                {availableDateFormated}
            </span>

            <div  className={classNames('rounded border border-gray-500 p-4 mt-2 relative',{
                'bg-green-500': isActiveLesson && isLessonAvailableAt,
                "before:absolute before:content-[' '] before:w-4 before:h-4 before:top-[calc(50%-8px)] before:-left-2 before:bg-green-500 before:rotate-45 before:rounded-sm": isActiveLesson && isLessonAvailableAt,
                'opacity-50 cursor-no-drop': !isLessonAvailableAt,
                'group-hover:border-green-500': isLessonAvailableAt
            })}>
                <header className="flex items-center justify-between">
                    {isLessonAvailableAt ? (
                        <span className={classNames("text-sm text-blue-500 font-medium flex items-center gap-2", {
                            'text-white': isActiveLesson && isLessonAvailableAt,
                            'text-blue-500': !isActiveLesson,
                        })}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}

                    <span className={classNames("text-xs rounded py-[0.125rem] px-2 text-white border  font-bold", {
                        'border-white': isActiveLesson && isLessonAvailableAt,
                        'border-green-300': !isActiveLesson
                    })}>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>

                </header>

                <strong className={classNames(" mt-5 block", {
                    'text-white': isActiveLesson && isLessonAvailableAt,
                    'text-gray-200': !isActiveLesson,
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}