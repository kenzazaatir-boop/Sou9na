import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Clock, X, Check, Mic, MicOff, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSEO } from '@/hooks';

interface Scene {
  time: string;
  visual: string;
  voixOff: string;
  videoSrc: string;
  thumbnail: string;
}

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  items: string[];
  music: string;
  slogan: string;
  scenes: Scene[];
}

const videos: Video[] = [
  {
    id: 'olive-wood-story',
    title: 'خشب الزيتون: روح الأرض 🌿',
    duration: '2:30',
    thumbnail: 'videos/economie-circulaire-1.jpg',
    items: [
      'جني الزيتون في الصباح الباكر',
      'صنعة اليدين في الورشة',
      'تحول الخشب لمنتج فاخر',
      'عرض في سوق الحرفيين',
      'فرحة الزبائن بالصناعة التقليدية',
    ],
    music: 'موسيقى تونسية هادية و أصوات العصافير',
    slogan: "اللي تعطينا الأرض، يرجع تحفة في دارك.",
    scenes: [
      { time: '0–30 s', visual: 'شروق الشمس الذهبي على حقول الزيتون، فلاح يتمشى بلبسة تقليدية ويلم في أغصان الخشب الخام', voixOff: 'مع خيوط الفجر الأولى في ريف تونس، تبدأ رحلة خشب الزيتون. الفلاح يلم الأغصان اللي بقات من الموسم، كنز طبيعي يستنى شكون يعطيه الروح.', videoSrc: 'videos/economie-circulaire-1.mp4', thumbnail: 'videos/economie-circulaire-1.jpg' },
      { time: '30–60 s', visual: 'داخل ورشة قديمة، ضوء الشمس يطل من الكوة، الحرفي يقص ويشكل الخشب بكل تركيز، لقطات مقربة لليدين', voixOff: 'داخل الورشة، الصمت ما يقطعه كان صوت الأدوات. الحرفي ببراعة يديه، يشكل في الخشب، يحترم عروقه وتفاصيله، في لقطة تعكس قرون من الصنعة.', videoSrc: 'videos/economie-circulaire-2.mp4', thumbnail: 'videos/economie-circulaire-2.jpg' },
      { time: '60–90 s', visual: 'عملية الصنفرة (sanding) والدهن بالزيت الطبيعي، الخشب يبدأ يلمع ويظهر جماله النهائي', voixOff: 'بشوية بشوية، الغبرة تبرد والجمال يظهر. الخشب يتحول لملاعق، صحفة، وديكورات تفوح بريحة الأرض. لمسة الزيت الطبيعي ترجعلو بريقه.', videoSrc: 'videos/economie-circulaire-3.mp4', thumbnail: 'videos/economie-circulaire-3.jpg' },
      { time: '90–120 s', visual: 'عرض المنتجات في ستاند سوقنا في سوق تقليدي مزين، ترتيب فني للمنتجات', voixOff: 'الآن, المنتجات جاهزة. في قلب سوق حرفي تونسي، تحف خشب الزيتون تتصدر المشهد، تجذب العين برقة تصميمها وأصالتها.', videoSrc: 'videos/economie-circulaire-4.mp4', thumbnail: 'videos/economie-circulaire-4.jpg' },
      { time: '120–150 s', visual: 'زبائن يلمسوا الخشب، يتبسموا ويتناقشوا مع الحرفي، لقطة شراء وفرحة متبادلة', voixOff: 'الزبون يلمس الدفء في الخشب، يبتسم ويقدر قيمة التعب والصنعة. هذي هي الروح اللي نفركسو عليها، تواصل بين الأرض، الحرفي، ودارك.', videoSrc: 'videos/economie-circulaire-1.mp4', thumbnail: 'videos/economie-circulaire-1.jpg' }
    ]
  },
  {
    id: 'palm-weave-story',
    title: 'سعف النخيل: ضفيرة الواحة 🌴',
    duration: '2:30',
    thumbnail: 'videos/sfax-woodwork.jpg',
    items: [
      'جمع السعف في واحات الجنوب',
      'صنعة الضفيرة في حوش العربي',
      'تشكيل القفة التونسية الأصيلة',
      'ألوان السعف في السوق',
      'لمسة تقليدية في حياة عصرية',
    ],
    music: 'موسيقى صحراوية و صوت ريح خفيف',
    slogan: "من قلب الواحة، صنعتنا استدامة.",
    scenes: [
      { time: '0–30 s', visual: 'لقطة درون لواحة شاسعة وقت الغروب، امرأة تجمع السعف اليابس من الأرض بوقار', voixOff: 'في واحات الجنوب العظيمة، المرا التونسية تجمع في السعف الشايح، فضلات النخلة اللي باش تولي أجمل قفة في يديك من بعد.', videoSrc: 'videos/sfax-woodwork.mp4', thumbnail: 'videos/sfax-woodwork.jpg' },
      { time: '30–60 s', visual: 'داخل حوش الدار، المرأة تظفر السعف بإيقاع منتظم، لقطات مقربة للسعف وهو يتداخل', voixOff: 'في الحوش العربي، يبدأ السحر. يدين الحرفية تظفر السعف بكل صبر، حركة ورا حركة، تخرج أنماط تحكي حكاية الواحة والصبر الجميل.', videoSrc: 'videos/economie-circulaire-3.mp4', thumbnail: 'videos/economie-circulaire-3.jpg' },
      { time: '60–90 s', visual: 'القفة تبدأ تظهر ملامحها، خياطة اليدين والقوالب، وضع اللمسات الملونة', voixOff: 'الضفيرة تطوال وتولي قفة، مروحة، ولا مظلة. إتقان في كل تفصيل، صناعة يدوية تحترم الطبيعة وما تلوّثش البيئة.', videoSrc: 'videos/tunis-textile.mp4', thumbnail: 'videos/tunis-textile.jpg' },
      { time: '90–120 s', visual: 'القفف معروضة في مدخل السوق، تعكس ألوان الشمس، حركة خفيفة للناس', voixOff: 'في مدخل المدينة العتيقة، القفف تتستف بكل فخامة. ألوان السعف الطبيعي تعكس شمس بلادنا وتجذب كل زائر يقدر الأصالة.', videoSrc: 'videos/sfax-woodwork.mp4', thumbnail: 'videos/sfax-woodwork.jpg' },
      { time: '120–150 s', visual: 'سائحة تختار قفة وتجربها، تبتسم للحرفية، لقطة وداع دافئة', voixOff: 'فرحة الزبونة وهي تهز معاها قطعة من روح الجنوب. الابتسامة المتبادلة هي أحسن شهادة على نجاح قصة سوقنا واستدامتها.', videoSrc: 'videos/tunis-textile.mp4', thumbnail: 'videos/tunis-textile.jpg' }
    ]
  },
  {
    id: 'wool-story',
    title: 'صوف البلاد: دفء المنسج 🐑',
    duration: '2:30',
    thumbnail: 'videos/kairouan-carpet.jpg',
    items: [
      'رعي الأغنام في جبال الريف',
      'غسل وغزل الصوف الخام',
      'نسج الزربية على المنسج العربي',
      'ألوان وأشكال المرقوم التونسي',
      'الزربية تزيد الدار زين وبركة',
    ],
    music: 'موسيقى شعبية أصيلة و صوت الغنم',
    slogan: "صوفنا دافي، و صنعتنا كافي.",
    scenes: [
      { time: '0–30 s', visual: 'مشهد واسع للجبال، قطيع غنم يرعى في الخضار، السارح يجمع الصوف بعد الجز', voixOff: 'من جبالنا الخضراء تبدأ الحكاية. الصوف الخام، أبيض كي الثلج، يتلم بكل حرص باش يولي دفء لبيوتنا في الشتاء.', videoSrc: 'videos/kairouan-carpet.mp4', thumbnail: 'videos/kairouan-carpet.jpg' },
      { time: '30–60 s', visual: 'حرفيات يغزلو في الصوف بالمغزل التقليدي، لقطات مقربة للصوف وهو يتحول لخيوط', voixOff: 'الحرفيات ببركة يديهم يغزلوا في الصوف. المغزل يدور ويطلع خيوط متينة، مخدومة بالحب ومصبرة بصوت الغناء الريفي الجميل.', videoSrc: 'videos/tunis-textile.mp4', thumbnail: 'videos/tunis-textile.jpg' },
      { time: '60–90 s', visual: 'المنسج يتحرك، الخيوط تتداخل، ألوان المرقوم تبدأ تظهر بوضوح، لقطات فنية للنسيج', voixOff: 'على المنسج العربي, الزربية تبدأ تتولد. كل خيط له بلاصته، وكل لون يحكي تاريخ القيروان والجنوب. فن يتوارثوه الأجيال بكل فخر.', videoSrc: 'videos/kairouan-carpet.mp4', thumbnail: 'videos/kairouan-carpet.jpg' },
      { time: '90–120 s', visual: 'المرقوم والزرابي معروضين في فضاء واسع، إضاءة دافئة تبرز ملمس الصوف', voixOff: 'في فضاء سوقنا، الزرابي تتحل بكل فخامة. المرقوم التونسي يزيّن البلاصة ويفرش طريق النجاح لكل حرفية أبدعت في صنعتها.', videoSrc: 'videos/tunis-textile.mp4', thumbnail: 'videos/tunis-textile.jpg' },
      { time: '120–150 s', visual: 'عائلة تختار زربية للدار، يمسّوا في جودة الصوف، لقطة تجمع الحرفية بالزبائن', voixOff: 'الزربية مش مجرد غطاء للأرض، هي بركة في الدار. العائلة تختار صنعتنا، والحرفية تبتسم وهي تشوف تعبها يولي فرحة في قلب دار تونسية.', videoSrc: 'videos/kairouan-carpet.mp4', thumbnail: 'videos/kairouan-carpet.jpg' }
    ]
  },
  {
    id: 'furniture-upcycling',
    title: 'إعادة الروح: تحف من خشب قديم 🪑',
    duration: '2:30',
    thumbnail: 'videos/economie-circulaire-3.jpg',
    items: [
      'تجميع خشب قديم ومهجور',
      'ترميم وصنفرة في الورشة',
      'تحول الخشب لأثاث مودرن',
      'تصميم بيئي وعصري',
      'أثاث يحكي حكاية جديدة',
    ],
    music: 'موسيقى آلية عصرية هادية و صوت مطرقة',
    slogan: "لا شي يضيع، كل شي يرجع للحياة.",
    scenes: [
      { time: '0–30 s', visual: 'تجميع قطع خشبية من أثاث قديم ملوح، الحرفي يتفقد جودة الخشب بلقطات درامية', voixOff: 'في عالم الضياع، الحرفي يلقى الحياة. خشب مهجور وأثاث قديم يستنى لمسة مبدعة باش يرجع يلمع من جديد في شكل عصري.', videoSrc: 'videos/economie-circulaire-3.mp4', thumbnail: 'videos/economie-circulaire-3.jpg' },
      { time: '30–60 s', visual: 'في الورشة، أصوات أدوات النجار، تقطيع وصنفرة الخشب، شرر خفيف وضوء فني', voixOff: 'عمل جبار يبدأ في الورشة. الصنفرة تنحي غبار السنين، والقص يحدد ملامح المستقبل. دقة في الحركة، وإبداع في التفكير.', videoSrc: 'videos/economie-circulaire-2.mp4', thumbnail: 'videos/economie-circulaire-2.jpg' },
      { time: '60–90 s', visual: 'تجميع طاولة أو رفوف، دهان نهائي يبرز عروق الخشب القديم بجمالية مودرن', voixOff: 'القطع تتجمع، والروح ترجع. طاولة عصرية بتصميم فريد، تحترم الماضي وتخدم الحاضر. كل قطعة هي وعد باستدامة حقيقية.', videoSrc: 'videos/economie-circulaire-4.mp4', thumbnail: 'videos/economie-circulaire-4.jpg' },
      { time: '90–120 s', visual: 'الأثاث معروض في رواق فني أو ستاند عصري، إضاءة "Spotlight" على التفاصيل', voixOff: 'في فضاء سوقنا الرقمي، الأثاث هذا يلقى قيمته. تصاميم تحترم البيئة وتواتي كل ذوق رفيع يفركس على التميز والأصالة.', videoSrc: 'videos/economie-circulaire-1.mp4', thumbnail: 'videos/economie-circulaire-1.jpg' },
      { time: '120–150 s', visual: 'شاب يصور الأثاث بالتلفون، يلمس الخشب بتقدير، لقطة شراء عبر المنصة', voixOff: 'جيلنا الجديد يقدر قيمة "الرسكلة" والجمال. بلمسة بسيطة على المنصة، يحجز مكانه في عالم الاستدامة ويدعم حرفي تونسي مبدع.', videoSrc: 'videos/economie-circulaire-3.mp4', thumbnail: 'videos/economie-circulaire-3.jpg' }
    ]
  },
  {
    id: 'nabeul-pottery-story',
    title: 'فخار نابل: لمسة الأرض 🏺',
    duration: '2:30',
    thumbnail: 'videos/nabeul-pottery.jpg',
    items: [
      'جمع الطين الأحمر من تلال نابل',
      'تشكيل الفخار على عجلة الحرفي',
      'تزجيج وتلوين التحف اليدوية',
      'عرض في سوق نابل العتيق',
      'قطعة فنية تزين كل بيت',
    ],
    music: 'موسيقى وترية تونسية وصوت العجلة',
    slogan: "من طين بلادنا، نصنع فخرنا.",
    scenes: [
      { time: '0–30 s', visual: 'لقطة درون واسعة لتلال نابل وقت الشروق, فلاح يجمع في كتل الطين الخام بلونها الأحمر المميز', voixOff: 'في تلال نابل الخصبة، الحكاية تبدأ بالأرض. الطين الأحمر، كنزنا الطبيعي، يتلم بكل حب باش يولي تحفة في يدين الحرفي التونسي.', videoSrc: 'videos/nabeul-pottery.mp4', thumbnail: 'videos/nabeul-pottery.jpg' },
      { time: '30–60 s', visual: 'داخل ورشة تقليدية، يدين الحرفي مشبكين بالطين، العجلة تدور والقطعة تبدأ تتشكل ببراعة', voixOff: 'في الورشة، الصمت يحكي إبداع. العجلة تدور، واليدين تشكل في الطين، حركة ورا حركة، حتّى تظهر ملامح "القلة" ولا "الصحفة" بأصالة تونسية.', videoSrc: 'videos/economie-circulaire-2.mp4', thumbnail: 'videos/economie-circulaire-2.jpg' },
      { time: '60–90 s', visual: 'عملية التلوين (Émaillage) بألوان نابل الزاهية كالأزرق والأصفر، لقطات مقربة للريشة وهي ترسم الأنماط', voixOff: 'بعد ما يبرد الفخار، يجي وقت الألوان. ريشة الحرفي ترسم تاريخنا، أزرق البحر وأصفر الشمس يتلاقاو فوق الفخار باش يعطيوه روح جديدة.', videoSrc: 'videos/economie-circulaire-4.mp4', thumbnail: 'videos/economie-circulaire-4.jpg' },
      { time: '90–120 s', visual: 'الفخار معروض في شوارع نابل العتيقة، ترتيب فني يجذب السياح والمارة، أضواء الشمس تلمع فوق الزجاج', voixOff: 'في قلب سوق نابل، الفخار يضوي المكان. تحف فنية معروضة بكل فخر، تحكي قصة صمود حرفة توارثوها الأجيال وما زالت تزيّن شوارعنا.', videoSrc: 'videos/nabeul-pottery.mp4', thumbnail: 'videos/nabeul-pottery.jpg' },
      { time: '120–150 s', visual: 'سائحة تختار فاز (Vase) كبير، الحرفي يغلفه بكل عناية، تبادل ابتسامات وشكر، لقطة ختامية دافئة', voixOff: 'القطعة هذي مش مجرد فخار، هي شقفة من قلب تونس. فرحة الزبون وهو يهز معاه صنعتنا هي الوقود اللي يخلينا نواصلو ونطوروا في سوقنا.', videoSrc: 'videos/nabeul-pottery.mp4', thumbnail: 'videos/nabeul-pottery.jpg' }
    ]
  },
];

function VideoPlayer({ video, isOpen, onClose }: { video: Video; isOpen: boolean; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [narratorOn, setNarratorOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const narrationTimeoutRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  // Web Speech API narrator
  const speak = (text: string) => {
    if (!narratorOn || !('speechSynthesis' in window)) return;
    
    // Stop any current speech and clear pending timeouts
    window.speechSynthesis.cancel();
    if (narrationTimeoutRef.current) window.clearTimeout(narrationTimeoutRef.current);

    // Natural pause before starting (makes it feel less robotic)
    narrationTimeoutRef.current = window.setTimeout(() => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ar-TN'; 
      utter.rate = 0.82; // Slightly slower for more gravitas
      utter.pitch = 1.0;  // More natural pitch
      
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang === 'ar-TN') || voices.find(v => v.lang.startsWith('ar'));
      if (arabicVoice) utter.voice = arabicVoice;

      window.speechSynthesis.speak(utter);
      narrationTimeoutRef.current = null;
    }, 400); 
  };

  // Speak current scene voixOff when scene changes and is playing
  useEffect(() => {
    if (isPlaying && isOpen && video.scenes?.[currentSceneIndex]) {
      speak(video.scenes[currentSceneIndex].voixOff);
    }
    return () => { window.speechSynthesis?.cancel(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneIndex, isPlaying, isOpen]);

  // Stop narrator when paused or closed
  useEffect(() => {
    if (!isPlaying || !isOpen) {
      window.speechSynthesis?.cancel();
    }
  }, [isPlaying, isOpen]);

  // Stop narrator when narratorOn toggled off
  useEffect(() => {
    if (!narratorOn) window.speechSynthesis?.cancel();
  }, [narratorOn]);

  // Auto-play scenes timer (TV Series format)
  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying && isOpen && !isTransitioning) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentSceneIndex < video.scenes.length - 1) {
              // Trigger transition
              setIsTransitioning(true);
              return 100;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 1;
        });
      }, 75); 
    }
    return () => window.clearInterval(interval);
  }, [isPlaying, isOpen, currentSceneIndex, video.scenes?.length, isTransitioning]);

  // Handle actual transition state logic
  useEffect(() => {
    if (isTransitioning) {
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentSceneIndex((i) => i + 1);
        setProgress(0);
        setIsTransitioning(false);
        transitionTimeoutRef.current = null;
      }, 600);
    }
    return () => {
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    };
  }, [isTransitioning]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (narrationTimeoutRef.current) window.clearTimeout(narrationTimeoutRef.current);
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentSceneIndex(0);
      setProgress(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      window.speechSynthesis?.cancel();
    }
  }, [isOpen, video]);

  const togglePlay = () => {
    if (progress >= 100 && currentSceneIndex === (video.scenes?.length || 1) - 1) {
      setCurrentSceneIndex(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const nextScene = () => {
    if (currentSceneIndex < (video.scenes?.length || 1) - 1) {
      setCurrentSceneIndex((i) => i + 1);
      setProgress(0);
    }
  };

  const prevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((i) => i - 1);
      setProgress(0);
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const currentScene = video.scenes?.[currentSceneIndex];

  const isFinalSlogan = currentSceneIndex === video.scenes.length - 1 && progress > 60;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* TV Series Style: wide 16:9 left panel + episode sidebar right */}
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-[#0d0d0d] border-none shadow-[0_30px_80px_rgba(0,0,0,0.8)] rounded-xl">
        <div className="flex flex-col h-full" ref={containerRef}>

          {/* ─── Sticky Series Header ─── */}
          <div className="flex items-center justify-between px-6 py-3 bg-black/80 backdrop-blur border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
              <span className="text-white/60 text-xs font-bold tracking-widest uppercase">Soukna Originals</span>
              <span className="text-white/30 text-xs">·</span>
              <span className="text-white font-medium text-sm truncate max-w-xs" dir="rtl">{video.title}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Narrator toggle */}
              <Button
                variant="ghost" size="icon"
                className={`rounded-full h-8 w-8 transition-all ${
                  narratorOn ? 'text-olive bg-olive/20 hover:bg-olive/30' : 'text-white/40 hover:bg-white/10'
                }`}
                onClick={() => setNarratorOn(n => !n)}
                title={narratorOn ? 'Désactiver le narrateur' : 'Activer le narrateur arabe'}
              >
                {narratorOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10 rounded-full h-8 w-8" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* ─── Main Content Area ─── */}
          <div className="flex flex-1 min-h-0">

            {/* Left: Current Scene Display (16:9) */}
            <div className="relative flex-1 bg-black overflow-hidden film-grain vignette">
              <div className="relative aspect-video w-full overflow-hidden">

                {/* Scene Video — muted, looping, auto-play */}
                <div className="w-full h-full overflow-hidden">
                  <video
                    key={currentSceneIndex}
                    src={currentScene?.videoSrc}
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      isPlaying ? 'animate-ken-burns' : ''
                    } ${isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
                    style={{ 
                      opacity: isFinalSlogan ? 0.2 : (isTransitioning ? 0 : 1),
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                {/* Cinematic dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[7]" />

                {/* Slogan Finale */}
                {isFinalSlogan && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-8 animate-slide-up">
                    <div className="text-terracotta text-xs font-bold tracking-[0.3em] uppercase mb-4">Soukna — الخاتمة</div>
                    <h2
                      className="text-5xl font-black text-white text-center leading-tight"
                      dir="rtl"
                      style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}
                    >
                      {video.slogan}
                    </h2>
                  </div>
                )}

                {/* Scene info bottom-left */}
                {!isFinalSlogan && currentScene && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide uppercase">
                        Passage {currentSceneIndex + 1}
                      </span>
                      <span className="text-white/50 text-xs">{currentScene.time}</span>
                    </div>
                    <p className="text-white text-lg font-bold leading-snug" dir="rtl"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                      {currentScene.visual}
                    </p>
                  </div>
                )}

                {/* Play/Pause overlay center button */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <Button
                      variant="ghost" size="icon"
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 shadow-2xl"
                      onClick={togglePlay}
                    >
                      {progress >= 100 && currentSceneIndex === video.scenes.length - 1
                        ? <ArrowLeft className="w-6 h-6 rotate-180" />
                        : <Play className="w-7 h-7 ml-1 fill-white" />
                      }
                    </Button>
                  </div>
                )}

                {/* Bottom Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-8 px-4 pb-3">
                  {/* Timeline progress bar */}
                  <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden mb-3 cursor-pointer group/bar">
                    <div
                      className="h-full bg-terracotta transition-all ease-linear"
                      style={{ width: `${((currentSceneIndex / video.scenes.length) + (progress / 100 / video.scenes.length)) * 100}%` }}
                    />
                    <div className="absolute inset-y-0 -top-1 -bottom-1 left-0 right-0 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                      {video.scenes.map((_, idx) => (
                        <div
                          key={idx}
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50 hover:bg-white cursor-pointer"
                          style={{ left: `${((idx / video.scenes.length) * 100)}%` }}
                          onClick={() => { setCurrentSceneIndex(idx); setProgress(0); setIsPlaying(true); }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/10" onClick={prevScene} disabled={currentSceneIndex === 0}>
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/10" onClick={togglePlay}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/10" onClick={nextScene} disabled={currentSceneIndex === video.scenes.length - 1}>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 text-xs">{currentSceneIndex + 1} / {video.scenes.length}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-white/10" onClick={toggleFullscreen} title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}>
                        <Maximize2 className={`w-4 h-4 transition-transform ${isFullscreen ? 'rotate-45' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Episodes / Scenes sidebar */}
            <div className="w-72 shrink-0 bg-[#111] border-l border-white/5 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">Passages de l'histoire</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                {video.scenes.map((scene, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setCurrentSceneIndex(idx); setProgress(0); setIsPlaying(true); }}
                    className={`flex gap-3 p-3 cursor-pointer transition-all duration-200 border-l-2 ${
                      idx === currentSceneIndex
                        ? 'bg-white/10 border-terracotta'
                        : 'border-transparent hover:bg-white/5'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-24 h-14 shrink-0 rounded overflow-hidden">
                      <img src={scene.thumbnail} alt={scene.visual} className="w-full h-full object-cover" />
                      {idx < currentSceneIndex && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {idx === currentSceneIndex && isPlaying && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                            <Pause className="w-2.5 h-2.5 fill-white text-white" />
                          </div>
                        </div>
                      )}
                      {/* Per-scene progress */}
                      {idx === currentSceneIndex && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30">
                          <div className="h-full bg-terracotta" style={{ width: `${progress}%` }} />
                        </div>
                      )}
                    </div>
                    {/* Text Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                          idx === currentSceneIndex ? 'bg-terracotta text-white' : 'bg-white/10 text-white/50'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-white/30 text-[10px]">{scene.time}</span>
                      </div>
                      <p className={`text-xs leading-snug line-clamp-3 ${
                        idx === currentSceneIndex ? 'text-white font-medium' : 'text-white/40'
                      }`} dir="rtl">
                        {scene.visual}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Slogan finale episode card */}
                <div
                  className={`flex gap-3 p-3 cursor-pointer transition-all duration-200 border-l-2 ${
                    progress >= 100 && currentSceneIndex === video.scenes.length - 1
                      ? 'bg-terracotta/10 border-terracotta/50'
                      : 'border-transparent hover:bg-white/5'
                  }`}
                  onClick={() => { setCurrentSceneIndex(video.scenes.length - 1); setProgress(80); setIsPlaying(false); }}
                >
                  <div className="w-24 h-14 shrink-0 rounded overflow-hidden bg-gradient-to-br from-terracotta/30 to-olive/30 flex items-center justify-center border border-white/10">
                    <span className="text-white text-2xl">🎬</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-terracotta/70 uppercase tracking-wider mb-1">Finale</div>
                    <p className="text-white/50 text-xs leading-snug" dir="rtl">{video.slogan}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Videos() {
  const { SEOComponent } = useSEO();
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get('video');
  const selectedVideo = videoId ? videos.find((v) => v.id === videoId) || null : null;

  const handleVideoClick = (video: Video) => {
    setSearchParams({ video: video.id });
  };


  return (
    <>
      {SEOComponent}
      <div className="min-h-screen bg-gray-50 pt-4">

      {/* Hero */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive/10 text-olive text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Documentaire
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            L'Artisanat Responsable en Action
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Découvrez comment Soukna transforme chaque achat en impact positif pour les artisans et l'environnement
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-all cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-terracotta transition-colors">
                    {video.title}
                  </h3>
                  
                  {/* Items list */}
                  <ul className="space-y-2 mb-4">
                    {video.items.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-olive flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-terracotta/10 text-terracotta">
                      {video.music}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-terracotta/10 to-olive/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-olive/20 mb-6">
            <span className="text-3xl">🤝</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Soutenir l'Artisanat Tunisien
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Chaque achat aide à préserver notre patrimoine et protéger notre environnement
          </p>
          <Link to="/catalog">
            <Button size="lg" className="gradient-terracotta text-white">
              Acheter maintenant
            </Button>
          </Link>
        </div>
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSearchParams({})}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden bg-black border-none">
          {selectedVideo && (
            <VideoPlayer
              video={selectedVideo}
              isOpen={!!selectedVideo}
              onClose={() => setSearchParams({})}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}
